import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { toast } from "sonner";
import {
  MessageSquare,
  Plus,
  Pencil,
  ChevronDown,
  Copy,
  Check,
  Code,
  BookOpen,
  Eye,
} from "lucide-react";

interface WhatsAppConfig {
  id: string;
  form_id: string;
  form_label: string;
  message_template: string;
  active: boolean;
  created_at: string;
  updated_at: string;
}

const VARIABLES = [
  { tag: "{{nome}}", label: "Nome do lead", example: "Ana Paula" },
  { tag: "{{email}}", label: "E-mail do lead", example: "ana@email.com" },
  { tag: "{{whatsapp}}", label: "Telefone do lead", example: "(11) 99999-0000" },
  { tag: "{{marca}}", label: "Nome da marca", example: "Studio Ana" },
  { tag: "{{servico}}", label: "Serviço solicitado", example: "Registro de marca" },
  { tag: "{{link}}", label: "Link personalizado", example: "https://permarke.com.br/guia" },
];

const EDGE_FUNCTION_CODE = `import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

const WHATSAPP_TOKEN = Deno.env.get("WHATSAPP_TOKEN")!
const PHONE_NUMBER_ID = Deno.env.get("WHATSAPP_PHONE_ID")!

serve(async (req) => {
  const { form_id, lead } = await req.json()

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  )

  const { data: config } = await supabase
    .from("whatsapp_config")
    .select("message_template, active")
    .eq("form_id", form_id)
    .single()

  if (!config?.active) return new Response("inactive", { status: 200 })

  let message = config.message_template
  Object.entries(lead).forEach(([key, value]) => {
    message = message.replaceAll(\`{{\${key}}}\`, String(value))
  })

  const phone = lead.whatsapp.replace(/\\D/g, "")
  const phoneFormatted = phone.startsWith("55") ? phone : \`55\${phone}\`

  const res = await fetch(
    \`https://graph.facebook.com/v19.0/\${PHONE_NUMBER_ID}/messages\`,
    {
      method: "POST",
      headers: {
        Authorization: \`Bearer \${WHATSAPP_TOKEN}\`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: phoneFormatted,
        type: "text",
        text: { body: message },
      }),
    }
  )

  const result = await res.json()
  return new Response(JSON.stringify(result), { status: 200 })
})`;

const DEPLOY_STEPS = [
  "Criar a Edge Function no Supabase CLI: supabase functions new notify-whatsapp",
  "Colar o código acima no arquivo supabase/functions/notify-whatsapp/index.ts",
  "Configurar variáveis de ambiente no Supabase Dashboard → Settings → Edge Functions:\n   • WHATSAPP_TOKEN = seu token permanente Meta\n   • WHATSAPP_PHONE_ID = seu Phone Number ID",
  "Deploy: supabase functions deploy notify-whatsapp",
  "No formulário, chamar:\nsupabase.functions.invoke('notify-whatsapp', {\n  body: { form_id: 'viabilidade', lead: { nome, email, whatsapp, marca } }\n})",
];

export default function WhatsAppDashboard() {
  const navigate = useNavigate();
  const [configs, setConfigs] = useState<WhatsAppConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<WhatsAppConfig | null>(null);
  const [formLabel, setFormLabel] = useState("");
  const [formId, setFormId] = useState("");
  const [template, setTemplate] = useState("");
  const [active, setActive] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate("/admin/login");
    });
  }, [navigate]);

  const fetchConfigs = useCallback(async () => {
    const { data } = await supabase
      .from("whatsapp_config")
      .select("*")
      .order("created_at");
    if (data) setConfigs(data as unknown as WhatsAppConfig[]);
    setLoading(false);
  }, []);

  useEffect(() => { fetchConfigs(); }, [fetchConfigs]);

  const openNew = () => {
    setEditing(null);
    setFormLabel("");
    setFormId("");
    setTemplate("");
    setActive(true);
    setShowPreview(false);
    setModalOpen(true);
  };

  const openEdit = (c: WhatsAppConfig) => {
    setEditing(c);
    setFormLabel(c.form_label);
    setFormId(c.form_id);
    setTemplate(c.message_template);
    setActive(c.active);
    setShowPreview(false);
    setModalOpen(true);
  };

  const insertVariable = (tag: string) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const newVal = template.slice(0, start) + tag + template.slice(end);
    setTemplate(newVal);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + tag.length, start + tag.length);
    }, 0);
  };

  const preview = () => {
    let msg = template;
    VARIABLES.forEach((v) => {
      msg = msg.split(v.tag).join(v.example);
    });
    return msg;
  };

  const save = async () => {
    if (!formId || !formLabel || !template) {
      toast.error("Preencha todos os campos");
      return;
    }
    const payload = {
      form_id: formId,
      form_label: formLabel,
      message_template: template,
      active,
      updated_at: new Date().toISOString(),
    };

    if (editing) {
      await supabase.from("whatsapp_config").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("whatsapp_config").insert(payload as any);
    }
    toast.success("Salvo com sucesso!");
    setModalOpen(false);
    fetchConfigs();
  };

  const toggleActive = async (c: WhatsAppConfig) => {
    await supabase
      .from("whatsapp_config")
      .update({ active: !c.active, updated_at: new Date().toISOString() } as any)
      .eq("id", c.id);
    fetchConfigs();
  };

  const copyCode = () => {
    navigator.clipboard.writeText(EDGE_FUNCTION_CODE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A0A0A" }}>
        <p style={{ color: "#F5F0EB" }}>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#0A0A0A", color: "#F5F0EB" }}>
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <MessageSquare className="w-7 h-7" style={{ color: "#e73b97" }} />
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Awesome Serif', Georgia, serif" }}>
            WhatsApp Automático
          </h1>
          <span
            className="ml-2 text-xs px-3 py-1 rounded-full font-semibold"
            style={{ background: "#e73b97", color: "#fff" }}
          >
            Dashboard Interno
          </span>
        </div>
        <p className="text-sm mb-8 opacity-70" style={{ fontFamily: "'Red Hat Display', sans-serif" }}>
          Configure as mensagens enviadas automaticamente para cada lead
        </p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {configs.map((c) => (
            <div
              key={c.id}
              className="rounded-xl p-5 border"
              style={{ background: "#141414", borderColor: c.active ? "#e73b97" : "#333" }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-lg" style={{ fontFamily: "'Red Hat Display', sans-serif" }}>
                    {c.form_label}
                  </h3>
                  <span className="text-xs opacity-50">form_id: {c.form_id}</span>
                </div>
                <Switch checked={c.active} onCheckedChange={() => toggleActive(c)} />
              </div>
              <p className="text-sm opacity-60 line-clamp-3 mb-4">{c.message_template}</p>
              <Button
                onClick={() => openEdit(c)}
                className="rounded-full text-sm"
                style={{ background: "#e73b97", color: "#fff" }}
              >
                <Pencil className="w-4 h-4 mr-1" /> Editar mensagem
              </Button>
            </div>
          ))}

          {/* Add new */}
          <button
            onClick={openNew}
            className="rounded-xl p-5 border-2 border-dashed flex flex-col items-center justify-center gap-2 min-h-[160px] transition-colors hover:border-[#e73b97]"
            style={{ borderColor: "#333", color: "#888" }}
          >
            <Plus className="w-8 h-8" />
            <span className="text-sm font-medium">Novo formulário</span>
          </button>
        </div>

        {/* Edge Function Code */}
        <Collapsible className="mb-6">
          <CollapsibleTrigger className="flex items-center gap-2 w-full text-left py-3 font-semibold">
            <Code className="w-5 h-5" style={{ color: "#e73b97" }} />
            Código da Edge Function
            <ChevronDown className="w-4 h-4 ml-auto" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div
              className="rounded-xl p-4 mt-2 border relative overflow-auto"
              style={{ background: "#141414", borderColor: "#e73b9733" }}
            >
              <button
                onClick={copyCode}
                className="absolute top-3 right-3 p-2 rounded-lg transition-colors"
                style={{ background: "#222" }}
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
              <pre className="text-xs leading-relaxed overflow-x-auto" style={{ color: "#ccc" }}>
                <code>{EDGE_FUNCTION_CODE}</code>
              </pre>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Deploy Instructions */}
        <Collapsible>
          <CollapsibleTrigger className="flex items-center gap-2 w-full text-left py-3 font-semibold">
            <BookOpen className="w-5 h-5" style={{ color: "#e73b97" }} />
            Como ativar
            <ChevronDown className="w-4 h-4 ml-auto" />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ol className="list-decimal list-inside space-y-3 mt-2 text-sm opacity-80">
              {DEPLOY_STEPS.map((step, i) => (
                <li key={i} className="whitespace-pre-wrap">{step}</li>
              ))}
            </ol>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Edit Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent
          className="max-w-2xl border"
          style={{ background: "#141414", borderColor: "#e73b9744", color: "#F5F0EB" }}
        >
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "'Awesome Serif', Georgia, serif" }}>
              {editing ? "Editar mensagem" : "Novo formulário"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-2">
            <div>
              <Label>Nome do formulário</Label>
              <Input
                value={formLabel}
                onChange={(e) => setFormLabel(e.target.value)}
                placeholder="Ex: Análise de Viabilidade"
                className="mt-1 border-[#333] bg-[#0A0A0A] text-[#F5F0EB]"
              />
            </div>
            <div>
              <Label>ID do formulário</Label>
              <Input
                value={formId}
                onChange={(e) => setFormId(e.target.value)}
                readOnly={!!editing}
                placeholder="Ex: viabilidade"
                className="mt-1 border-[#333] bg-[#0A0A0A] text-[#F5F0EB]"
              />
            </div>
            <div>
              <Label>Template da mensagem</Label>
              <Textarea
                ref={textareaRef}
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                rows={6}
                className="mt-1 border-[#333] bg-[#0A0A0A] text-[#F5F0EB]"
              />
            </div>

            {/* Variables */}
            <div>
              <Label className="mb-2 block">Variáveis disponíveis</Label>
              <div className="flex flex-wrap gap-2">
                {VARIABLES.map((v) => (
                  <button
                    key={v.tag}
                    type="button"
                    onClick={() => insertVariable(v.tag)}
                    className="text-xs px-3 py-1.5 rounded-full border transition-colors hover:border-[#e73b97] hover:text-[#e73b97]"
                    style={{ borderColor: "#444", color: "#aaa" }}
                    title={v.label}
                  >
                    {v.tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Toggle */}
            <div className="flex items-center gap-3">
              <Switch checked={active} onCheckedChange={setActive} />
              <span className="text-sm">{active ? "Ativo" : "Inativo"}</span>
            </div>

            {/* Preview */}
            <div>
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 text-sm font-medium mb-2"
                style={{ color: "#e73b97" }}
              >
                <Eye className="w-4 h-4" />
                {showPreview ? "Ocultar preview" : "Ver preview"}
              </button>
              {showPreview && (
                <div
                  className="rounded-xl p-4 text-sm whitespace-pre-wrap"
                  style={{ background: "#0A0A0A", border: "1px solid #e73b9733" }}
                >
                  {preview()}
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="mt-4">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={save} className="rounded-full" style={{ background: "#e73b97", color: "#fff" }}>
              Salvar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
