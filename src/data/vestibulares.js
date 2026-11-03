const vestibulares = [
  { id: 1, universidade_id: 1, professor_id: 'prof-1', nome_vestibular: 'Vestibular 2025.1', tipo: 'Vestibular Próprio', data_inscricao_inicio: '2025-01-15', data_inscricao_fim: '2025-02-15', data_prova: '2025-03-15', data_resultado: '2025-04-30', edital_url: 'https://unigranrio.br/vestibular2025/edital.pdf', inscricao_url: 'https://vestibular.unigranrio.br', descricao: 'Vestibular tradicional da UNIGRANRIO para ingresso no primeiro semestre de 2025. Prova de conhecimentos gerais + específicas por curso. Redação no modelo ENEM.\n\nCursos mais concorridos:\n- Medicina: ~120 candidatos/vaga\n- Odontologia: ~45 candidatos/vaga\n- Psicologia: ~28 candidatos/vaga\n- Enfermagem: ~22 candidatos/vaga\n\nIsenção de taxa para candidatos inscritos no CadÚnico até 31/01/2025.', status: 'publicado', criado_em: '2024-12-01T10:00:00Z', atualizado_em: '2025-01-10T14:30:00Z' },
  { id: 2, universidade_id: 1, professor_id: 'prof-1', nome_vestibular: 'SISU 2025', tipo: 'SISU', data_inscricao_inicio: '2025-01-15', data_inscricao_fim: '2025-01-28', data_prova: null, data_resultado: '2025-02-06', edital_url: 'https://acessounico.mec.gov.br/sisu/edital-2025', inscricao_url: 'https://acessounico.mec.gov.br/sisu', descricao: 'Sistema de Seleção Unificada (SISU) 2025. A UNIGRANRIO oferece vagas em diversos cursos via SISU. A seleção usa exclusivamente a nota do ENEM 2024.\n\nNão há prova própria. O candidato deve ter participado do ENEM 2024 e não ter zerado a redação.\n\nCursos participantes: Medicina, Direito, Enfermagem, Psicologia, Administração, Engenharia Civil.\n\nChamada regular: 06/02/2025. Lista de espera: 11/02 a 21/02/2025.', status: 'publicado', criado_em: '2024-11-20T09:00:00Z', atualizado_em: '2025-01-15T08:00:00Z' },
  { id: 3, universidade_id: 1, professor_id: 'prof-1', nome_vestibular: 'Vestibular 2025.2', tipo: 'Vestibular Próprio', data_inscricao_inicio: '2025-07-01', data_inscricao_fim: '2025-07-31', data_prova: '2025-09-15', data_resultado: '2025-10-30', edital_url: null, inscricao_url: null, descricao: 'Vestibular para ingresso no segundo semestre de 2025. Edital a ser publicado em junho/2025. Datas previstas, sujeitas a alteração.', status: 'rascunho', criado_em: '2025-01-10T15:00:00Z', atualizado_em: '2025-01-10T15:00:00Z' },
  { id: 4, universidade_id: 2, professor_id: 'prof-2', nome_vestibular: 'Vestibular UDESC 2025', tipo: 'Vestibular Próprio', data_inscricao_inicio: '2025-01-10', data_inscricao_fim: '2025-02-10', data_prova: '2025-03-09', data_resultado: '2025-04-15', edital_url: 'https://vestibular.udesc.br/edital2025.pdf', inscricao_url: 'https://vestibular.udesc.br', descricao: 'Vestibular unificado da UDESC para todos os campi. Prova única com 60 questões objetivas + redação.\n\nCursos de destaque:\n- Design (Florianópolis, Joinville, Lages): 3 habilitações\n- Administração Pública (Florianópolis)\n- Engenharia Mecânica (Joinville)\n- Medicina Veterinária (Lages)\n\nIsenção para candidatos de escola pública e baixa renda. Solicitação até 20/01/2025.', status: 'publicado', criado_em: '2024-11-15T10:00:00Z', atualizado_em: '2025-01-05T12:00:00Z' },
  { id: 5, universidade_id: 2, professor_id: 'prof-2', nome_vestibular: 'SISU 2025 - UDESC', tipo: 'SISU', data_inscricao_inicio: '2025-01-15', data_inscricao_fim: '2025-01-28', data_prova: null, data_resultado: '2025-02-06', edital_url: 'https://acessounico.mec.gov.br/sisu', inscricao_url: 'https://acessounico.mec.gov.br/sisu', descricao: 'Vagas da UDESC no SISU 2025. Seleção pela nota do ENEM 2024. Cursos em todos os 13 campi.', status: 'publicado', criado_em: '2024-11-20T09:00:00Z', atualizado_em: '2025-01-15T08:00:00Z' },
  { id: 6, universidade_id: 3, professor_id: 'prof-3', nome_vestibular: 'Vestibular USP 2025 (FUVEST)', tipo: 'Vestibular Próprio', data_inscricao_inicio: '2024-08-19', data_inscricao_fim: '2024-10-08', data_prova: '2024-11-17', data_resultado: '2025-01-24', edital_url: 'https://www.fuvest.br/vestibular2025/edital.pdf', inscricao_url: 'https://www.fuvest.br', descricao: 'FUVEST 2025. Duas fases:\n1ª fase: 90 questões objetivas (todos os cursos)\n2ª fase: Provas discursivas específicas por carreira + redação\n\nCursos mais concorridos: Medicina (SP), Engenharia (Politécnica), Direito (Largo São Francisco), Psicologia.\n\nPrograma de Avaliação Seriada (PAS) também disponível.', status: 'publicado', criado_em: '2024-08-01T08:00:00Z', atualizado_em: '2024-11-20T16:00:00Z' },
  { id: 7, universidade_id: 3, professor_id: 'prof-3', nome_vestibular: 'SISU 2025 - USP', tipo: 'SISU', data_inscricao_inicio: '2025-01-15', data_inscricao_fim: '2025-01-28', data_prova: null, data_resultado: '2025-02-06', edital_url: 'https://acessounico.mec.gov.br/sisu', inscricao_url: 'https://acessounico.mec.gov.br/sisu', descricao: 'Vagas da USP no SISU 2025. A USP reserva 30% das vagas para SISU, 30% para FUVEST e 40% para ENEM-USP.', status: 'publicado', criado_em: '2024-11-20T09:00:00Z', atualizado_em: '2025-01-15T08:00:00Z' },
  { id: 8, universidade_id: 4, professor_id: 'prof-4', nome_vestibular: 'Vestibular UNICAMP 2025', tipo: 'Vestibular Próprio', data_inscricao_inicio: '2024-08-01', data_inscricao_fim: '2024-09-06', data_prova: '2024-10-20', data_resultado: '2025-01-27', edital_url: 'https://www.comvest.unicamp.br/vestibular2025/edital.pdf', inscricao_url: 'https://www.comvest.unicamp.br', descricao: 'Vestibular UNICAMP 2025 organizado pela COMVEST. Duas fases:\n1ª fase: 72 questões objetivas (todos os cursos)\n2ª fase: Provas discursivas por área + redação\n\nDestaque: Cursos de Exatas e Biológicas (Engenharias, Medicina, Ciências da Computação) muito concorridos.\n\nPrograma de Ação Afirmativa: Bônus para escola pública, autodeclarados pretos/pardos/indígenas, e residentes em Campinas.', status: 'publicado', criado_em: '2024-07-15T10:00:00Z', atualizado_em: '2024-10-25T14:00:00Z' },
  { id: 9, universidade_id: 5, professor_id: 'prof-5', nome_vestibular: 'Vestibular UFMG 2025', tipo: 'Vestibular Próprio', data_inscricao_inicio: '2024-09-02', data_inscricao_fim: '2024-10-07', data_prova: '2024-11-24', data_resultado: '2025-01-30', edital_url: 'https://www.ufmg.br/vestibular2025/edital.pdf', inscricao_url: 'https://www.ufmg.br/vestibular2025', descricao: 'Vestibular UFMG 2025. Prova única com 90 questões objetivas + redação. Realizado em dois domingos.\n\nCursos tradicionais: Medicina (Belo Horizonte), Direito, Engenharias, Arquitetura, Psicologia.\n\nSistema de cotas: 50% vagas para escola pública (subdividido por renda e raça).', status: 'publicado', criado_em: '2024-08-20T09:00:00Z', atualizado_em: '2024-11-01T11:00:00Z' },
  { id: 10, universidade_id: 6, professor_id: 'prof-6', nome_vestibular: 'Vestibular UFRGS 2025', tipo: 'Vestibular Próprio', data_inscricao_inicio: '2024-09-01', data_inscricao_fim: '2024-10-01', data_prova: '2025-01-04', data_resultado: '2025-02-10', edital_url: 'https://www.ufrgs.br/vestibular2025/edital.pdf', inscricao_url: 'https://www.ufrgs.br/vestibular2025', descricao: 'Vestibular UFRGS 2025. Prova em dois dias: 1º dia - 60 questões objetivas; 2º dia - 30 questões + redação.\n\nCursos de destaque: Medicina (Porto Alegre), Odontologia, Direito, Engenharias, Arquitetura.\n\nSistema de cotas: 50% para escola pública, com recorte racial e de renda.', status: 'publicado', criado_em: '2024-08-15T10:00:00Z', atualizado_em: '2024-12-15T15:00:00Z' },
]

let nextId = 11

function load(professorId = null) {
  try {
    const stored = localStorage.getItem('vestibulares_local')
    if (stored) {
      const parsed = JSON.parse(stored)
      if (Array.isArray(parsed) && parsed.length) {
        const maxId = Math.max(...parsed.map(v => v.id), ...vestibulares.map(v => v.id))
        nextId = maxId + 1
        const locais = parsed.filter(p => {
          const isBase = vestibulares.some(v => v.id === p.id)
          return !isBase && (!professorId || p.professor_id === professorId)
        })
        return [...vestibulares, ...locais]
      }
    }
  } catch {
    // ignore
  }
  return vestibulares
}

function save(list) {
  localStorage.setItem('vestibulares_local', JSON.stringify(list))
}

export function getAll(professorId) { return load(professorId) }
export function getByUni(id, professorId) { return load(professorId).filter(v => v.universidade_id === id) }
export function getById(id, professorId) { return load(professorId).find(v => v.id === Number(id)) }
export function add(v) { const list = load(); v.id = nextId++; v.criado_em = new Date().toISOString(); v.atualizado_em = new Date().toISOString(); list.push(v); save(list); return v }
export function update(id, data) { const list = load(); const i = list.findIndex(v => v.id === id); if (i === -1) return null; list[i] = { ...list[i], ...data, atualizado_em: new Date().toISOString() }; save(list); return list[i] }
export function remove(id) { const list = load().filter(v => v.id !== id); save(list); return true }
export function getStatus(v) {
  if (v.status !== 'publicado') return { label: v.status === 'rascunho' ? 'Rascunho' : 'Arquivado', class: 'status-' + v.status }
  const now = new Date(); now.setHours(0,0,0,0)
  const ini = v.data_inscricao_inicio ? new Date(v.data_inscricao_inicio) : null
  const fim = v.data_inscricao_fim ? new Date(v.data_inscricao_fim) : null
  const prova = v.data_prova ? new Date(v.data_prova) : null
  ini?.setHours(0,0,0,0); fim?.setHours(23,59,59,999); prova?.setHours(0,0,0,0)
  if (ini && fim && now >= ini && now <= fim) return { label: 'Inscrições Abertas', class: 'status-aberto' }
  if (fim && now > fim && prova && now < prova) return { label: 'Inscrições Encerradas', class: 'status-fechado' }
  if (prova && now >= prova) { if (v.data_resultado) { const r = new Date(v.data_resultado); r.setHours(0,0,0,0); if (now >= r) return { label: 'Resultado Divulgado', class: 'status-resultado' } } return { label: 'Prova Realizada', class: 'status-prova' } }
  if (ini && now < ini) { const d = Math.ceil((ini - now) / 86400000); return { label: d <= 30 ? 'Em Breve' : 'Futuro', class: d <= 30 ? 'status-breve' : 'status-futuro' } }
  return { label: 'Futuro', class: 'status-futuro' }
}
