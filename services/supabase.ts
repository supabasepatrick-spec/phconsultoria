
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://johkviqoznvgqqzpgmwm.supabase.co';
const supabaseAnonKey = 'sb_publishable_1rakoEeZLhfyqR-sda772g_jIn6QVNn';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

const RESEND_API_KEY = 're_your_api_key_here'; 
const CORS_PROXY = 'https://corsproxy.io/?';
const RESEND_API_URL = 'https://api.resend.com/emails';

export const sendEmailAlert = async (ticket: { 
  ticketNumber: number; 
  title: string; 
  requester: string; 
  priority: string;
  category: string;
}) => {
  if (RESEND_API_KEY === 're_your_api_key_here') return false;
  try {
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(RESEND_API_URL)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portal PH <onboarding@resend.dev>',
        to: ['ti@phconsultoria.com.br'],
        subject: `🚨 Novo Chamado #${ticket.ticketNumber}: ${ticket.title}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #33c2a6; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">PH Consultoria - Novo Chamado</h1>
            </div>
            <div style="padding: 30px;">
              <p>O chamado <strong>#${ticket.ticketNumber}</strong> foi aberto por <strong>${ticket.requester}</strong>.</p>
              <p><strong>Assunto:</strong> ${ticket.title}</p>
              <p><strong>Prioridade:</strong> ${ticket.priority}</p>
            </div>
          </div>
        `,
      }),
    });
    return response.ok;
  } catch (err) { return false; }
};

export const sendEmailStatusUpdateAlert = async (ticket: {
  ticketNumber: number;
  title: string;
  newStatus: string;
  recipientEmail: string;
}) => {
  if (RESEND_API_KEY === 're_your_api_key_here') return false;
  try {
    const statusLabels: Record<string, string> = {
      'OPEN': 'Aberto',
      'IN_PROGRESS': 'Em Progresso',
      'RESOLVED': 'Resolvido'
    };
    const response = await fetch(`${CORS_PROXY}${encodeURIComponent(RESEND_API_URL)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Portal PH <onboarding@resend.dev>',
        to: [ticket.recipientEmail],
        subject: `🔄 Atualização no Chamado #${ticket.ticketNumber}`,
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #0f172a; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Status Atualizado - Portal PH</h1>
            </div>
            <div style="padding: 30px; background-color: #ffffff;">
              <p style="font-size: 16px; color: #1e293b;">Olá, seu chamado <strong>#${ticket.ticketNumber}</strong> foi atualizado pela PH Consultoria.</p>
              <div style="margin: 25px 0; padding: 20px; background-color: #f0fdfa; border-radius: 8px; text-align: center; border: 1px solid #ccfbf1;">
                <span style="font-size: 18px; font-weight: bold; color: #1d6a5c;">${statusLabels[ticket.newStatus] || ticket.newStatus}</span>
              </div>
            </div>
          </div>
        `,
      }),
    });
    return response.ok;
  } catch (err) { return false; }
};
