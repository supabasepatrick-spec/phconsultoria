
import { createClient } from '@supabase/supabase-js';

// Novas credenciais fornecidas pelo usuário
const supabaseUrl = 'https://johkviqoznvgqqzpgmwm.supabase.co';
const supabaseAnonKey = 'sb_publishable_1rakoEeZLhfyqR-sda772g_jIn6QVNn';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * 💡 CONFIGURAÇÃO DE E-MAIL (RESEND):
 * O navegador bloqueia chamadas diretas para a API do Resend (Erro: Failed to fetch / CORS).
 * Estamos usando o 'corsproxy.io' para contornar isso neste ambiente de demonstração.
 */
const RESEND_API_KEY = 're_your_api_key_here'; 
const CORS_PROXY = 'https://corsproxy.io/?';
const RESEND_API_URL = 'https://api.resend.com/emails';

/**
 * Envia um alerta de e-mail de criação de chamado
 */
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
        from: 'AirService <onboarding@resend.dev>',
        to: ['ti@grupoairslaid.com.br'],
        subject: `🚨 Novo Chamado #${ticket.ticketNumber}: ${ticket.title}`,
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #e11d48; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Novo Chamado Recebido</h1>
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
  } catch (err) {
    console.error('Erro de conexão no envio:', err);
    return false;
  }
};

/**
 * Envia um alerta de e-mail informando a mudança de status
 */
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
        from: 'AirService <onboarding@resend.dev>',
        to: [ticket.recipientEmail],
        subject: `🔄 Atualização no Chamado #${ticket.ticketNumber}`,
        html: `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background-color: #0f172a; padding: 20px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 20px;">Status Atualizado</h1>
            </div>
            <div style="padding: 30px; background-color: #ffffff;">
              <p style="font-size: 16px; color: #1e293b;">Olá, seu chamado <strong>#${ticket.ticketNumber} - ${ticket.title}</strong> teve uma atualização de status.</p>
              <div style="margin: 25px 0; padding: 20px; background-color: #f8fafc; border-radius: 8px; text-align: center;">
                <span style="font-size: 18px; font-weight: bold; color: #2563eb;">${statusLabels[ticket.newStatus] || ticket.newStatus}</span>
              </div>
            </div>
          </div>
        `,
      }),
    });

    return response.ok;
  } catch (err) {
    console.error('Erro de conexão no envio de status:', err);
    return false;
  }
};
