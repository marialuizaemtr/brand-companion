import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-correlation-id",
  "Access-Control-Expose-Headers": "x-correlation-id",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const headerCid = req.headers.get("x-correlation-id") || "";
  let cid = headerCid;

  try {
    const body = await req.json();
    const { form_id, lead, correlation_id } = body;
    cid = headerCid || correlation_id || lead?.correlation_id || `wa-${crypto.randomUUID()}`;
    console.log(`[notify-whatsapp] cid=${cid} form_id=${form_id}`);

    if (!form_id || !lead || !lead.whatsapp) {
      return new Response(
        JSON.stringify({ error: "form_id and lead.whatsapp are required", correlation_id: cid }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json", "x-correlation-id": cid } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: config } = await supabaseClient
      .from("whatsapp_config")
      .select("message_template, active")
      .eq("form_id", form_id)
      .single();

    if (!config?.active) {
      console.log(`[notify-whatsapp] cid=${cid} inactive for ${form_id}`);
      return new Response(
        JSON.stringify({ status: "inactive", correlation_id: cid }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json", "x-correlation-id": cid } }
      );
    }

    let message = config.message_template;
    Object.entries(lead).forEach(([key, value]) => {
      message = message.replaceAll(`{{${key}}}`, String(value));
    });
    message = `${message}\n\n_cid:${cid}_`;

    const phone = lead.whatsapp.replace(/\D/g, "");
    const phoneFormatted = phone.startsWith("55") ? phone : `55${phone}`;

    const WHATSAPP_TOKEN = Deno.env.get("WHATSAPP_TOKEN");
    const PHONE_NUMBER_ID = Deno.env.get("WHATSAPP_PHONE_ID");

    if (!WHATSAPP_TOKEN || !PHONE_NUMBER_ID) {
      return new Response(
        JSON.stringify({ error: "WhatsApp credentials not configured", correlation_id: cid }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json", "x-correlation-id": cid } }
      );
    }

    const res = await fetch(
      `https://graph.facebook.com/v19.0/${PHONE_NUMBER_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: phoneFormatted,
          type: "text",
          text: { body: message },
        }),
      }
    );

    const result = await res.json();
    console.log(`[notify-whatsapp] cid=${cid} status=${res.status}`);
    return new Response(JSON.stringify({ ...result, correlation_id: cid }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json", "x-correlation-id": cid },
    });
  } catch (err) {
    console.error(`[notify-whatsapp] cid=${cid} error:`, err);
    return new Response(
      JSON.stringify({ error: String(err), correlation_id: cid }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json", "x-correlation-id": cid } }
    );
  }
});
