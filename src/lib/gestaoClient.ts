import { createClient } from '@supabase/supabase-js'

// Cliente Supabase do sistema de gestão Permarke (permarke-gestao)
export const gestao = createClient(
  'https://rturrhgvwkwbixizzorv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0dXJyaGd2d2t3Yml4aXp6b3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU3NTc1ODYsImV4cCI6MjA5MTMzMzU4Nn0.G-_TwJ4Oj3yNWWaFGv16hcBUaa5Aot6Wrtc-qOQqfB0',
)
