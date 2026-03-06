// Modal Sobre
const aboutBtn = document.getElementById('about-btn');
const aboutModal = document.getElementById('about-modal');
const aboutClose = document.getElementById('about-modal-close');
if (aboutBtn && aboutModal && aboutClose) {
    aboutBtn.addEventListener('click', () => {
        aboutModal.classList.add('active');
        aboutModal.focus();
    });
    aboutClose.addEventListener('click', () => {
        aboutModal.classList.remove('active');
    });
    aboutModal.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            aboutModal.classList.remove('active');
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aboutModal.classList.contains('active')) {
            aboutModal.classList.remove('active');
        }
    });
}
// Botão de voltar ao topo
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}
// Gerenciamento de Tema
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;
const themeIcon = themeToggle.querySelector('.icon');

// Carregar tema salvo ou usar preferência do sistema
const savedTheme = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme) {
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
} else if (systemPrefersDark) {
    html.setAttribute('data-theme', 'dark');
    updateThemeIcon('dark');
}

// Alternar tema
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Gerenciamento de Tabs
window.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
            localStorage.setItem('activeTab', targetTab);
        });
    });

    // Restaurar tab ativa ao carregar a página
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
        const savedButton = document.querySelector(`[data-tab="${savedTab}"]`);
        const savedContent = document.getElementById(savedTab);
        if (savedButton && savedContent) {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            savedButton.classList.add('active');
            savedContent.classList.add('active');
        }
    }

    // Suporte para navegação por teclado nas tabs
    tabButtons.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextButton = tabButtons[index + 1] || tabButtons[0];
                nextButton.focus();
                nextButton.click();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevButton = tabButtons[index - 1] || tabButtons[tabButtons.length - 1];
                prevButton.focus();
                prevButton.click();
            }
        });
    });
});

// Copiar query ao clicar no botão
document.addEventListener('DOMContentLoaded', () => {
    const queryCopyDivs = document.querySelectorAll('.query-copy');
    
    queryCopyDivs.forEach(div => {
        // Adicionar botão de copiar
        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-btn';
        copyBtn.innerHTML = '<span>📋</span><span>Copiar</span>';
        copyBtn.setAttribute('aria-label', 'Copiar query');
        div.appendChild(copyBtn);
        
        copyBtn.addEventListener('click', async (e) => {
            e.preventDefault();
            const codeElement = div.querySelector('code');
            const text = codeElement.textContent;
            
            try {
                await navigator.clipboard.writeText(text);
                
                // Feedback visual no botão
                copyBtn.classList.add('copied');
                copyBtn.innerHTML = '<span>✓</span><span>Copiado!</span>';
                
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    copyBtn.innerHTML = '<span>📋</span><span>Copiar</span>';
                }, 2000);
                
            } catch (err) {
                console.error('Erro ao copiar:', err);
                // Fallback para navegadores antigos
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    copyBtn.classList.add('copied');
                    copyBtn.innerHTML = '<span>✓</span><span>Copiado!</span>';
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                        copyBtn.innerHTML = '<span>📋</span><span>Copiar</span>';
                    }, 2000);
                } catch (err) {
                    console.error('Fallback também falhou:', err);
                }
                document.body.removeChild(textArea);
            }
        });
    });

    // Copiar texto de botões com data-copy (botões de prompt)
    const dataCopyButtons = document.querySelectorAll('[data-copy]');
    dataCopyButtons.forEach(btn => {
        btn.addEventListener('click', async (e) => {
            e.preventDefault();
            const text = btn.getAttribute('data-copy');
            const originalHTML = btn.innerHTML;
            const originalBg = btn.style.backgroundColor || window.getComputedStyle(btn).backgroundColor;
            
            try {
                await navigator.clipboard.writeText(text);
                
                // Feedback visual
                btn.innerHTML = '✓ Prompt copiado!';
                btn.style.backgroundColor = '#10b981';
                btn.style.color = 'white';
                
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                }, 2000);
                
            } catch (err) {
                console.error('Erro ao copiar:', err);
                // Fallback
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    btn.innerHTML = '✓ Prompt copiado!';
                    btn.style.backgroundColor = '#10b981';
                    btn.style.color = 'white';
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                    }, 2000);
                } catch (err) {
                    console.error('Fallback também falhou:', err);
                }
                document.body.removeChild(textArea);
            }
        });
    });
});

// ============================================
// SISTEMA DE CONFIGURAÇÃO DINÂMICA
// ============================================

const ConfigManager = {
    config: {
        technologyGroups: [], // Array de arrays: [['PHP', 'Laravel'], ['JavaScript', 'Node.js']]
        seniorities: [],
        locationType: 'remoto',
        cities: [],
        keywords: []
    },

    init() {
        this.loadConfig();
        this.setupEventListeners();
        this.renderTechGroups(); // Renderizar grupos de tecnologia
        this.renderAllTags();
        this.updateLocationFields();
        
        // Se houver configurações salvas, gerar queries automaticamente
        if (this.config.technologyGroups && this.config.technologyGroups.length > 0 && this.config.technologyGroups.some(group => group.length > 0)) {
            this.generateAllQueries();
        }
    },

    loadConfig() {
        const saved = localStorage.getItem('jobSearchConfig');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Migração: se tem technologies antigo, converter para technologyGroups
                if (parsed.technologies && !parsed.technologyGroups) {
                    parsed.technologyGroups = [parsed.technologies];
                }
                this.config = {
                    technologyGroups: parsed.technologyGroups || [],
                    seniorities: parsed.seniorities || [],
                    locationType: parsed.locationType || 'remoto',
                    cities: parsed.cities || [],
                    keywords: parsed.keywords || []
                };
            } catch (e) {
                console.error('Erro ao carregar configuração:', e);
            }
        }
    },

    saveConfig() {
        localStorage.setItem('jobSearchConfig', JSON.stringify(this.config));
    },

    setupEventListeners() {
        // Senioridade
        document.getElementById('add-seniority').addEventListener('click', () => this.addItem('seniority'));
        document.getElementById('seniority-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addItem('seniority');
        });

        // Localização
        document.getElementById('location-type').addEventListener('change', (e) => {
            this.config.locationType = e.target.value;
            this.updateLocationFields();
            this.saveConfig();
        });
        document.getElementById('location-type').value = this.config.locationType;

        // Cidades
        document.getElementById('add-city').addEventListener('click', () => this.addItem('city'));
        document.getElementById('city-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addItem('city');
        });

        // Keywords
        document.getElementById('add-keyword').addEventListener('click', () => this.addItem('keyword'));
        document.getElementById('keyword-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addItem('keyword');
        });

        // Ações
        document.getElementById('apply-config').addEventListener('click', () => this.applyConfig());
        document.getElementById('export-config').addEventListener('click', () => this.exportConfig());
        document.getElementById('import-config').addEventListener('click', () => {
            document.getElementById('import-file').click();
        });
        document.getElementById('import-file').addEventListener('change', (e) => this.importConfig(e));
    },

    updateLocationFields() {
        const cityGroup = document.getElementById('city-group');
        if (this.config.locationType === 'hibrido' || this.config.locationType === 'presencial') {
            cityGroup.style.display = 'block';
        } else {
            cityGroup.style.display = 'none';
        }
    },

    // ========== GERENCIAMENTO DE GRUPOS DE TECNOLOGIA ==========
    
    addTechGroup() {
        this.config.technologyGroups.push([]);
        this.saveConfig();
        this.renderTechGroups();
        
        // Focar no input do novo grupo
        const inputs = document.querySelectorAll('.tech-input');
        const lastInput = inputs[inputs.length - 1];
        if (lastInput) lastInput.focus();
    },

    removeTechGroup(groupIndex) {
        this.config.technologyGroups.splice(groupIndex, 1);
        this.saveConfig();
        this.renderTechGroups();
    },

    addTechToGroup(groupIndex, tech) {
        if (tech && !this.config.technologyGroups[groupIndex].includes(tech)) {
            this.config.technologyGroups[groupIndex].push(tech);
            this.saveConfig();
            this.renderTagsForGroup(groupIndex);
        }
    },

    removeTechFromGroup(groupIndex, tech) {
        this.config.technologyGroups[groupIndex] = this.config.technologyGroups[groupIndex].filter(t => t !== tech);
        this.saveConfig();
        this.renderTagsForGroup(groupIndex);
    },

    renderTechGroups() {
        const container = document.getElementById('tech-groups-container');
        container.innerHTML = '';

        this.config.technologyGroups.forEach((group, groupIndex) => {
            const groupCard = document.createElement('div');
            groupCard.className = 'tech-group-card';
            groupCard.style.cssText = 'background: var(--bg-secondary); padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border: 2px solid var(--border-color);';
            
            groupCard.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                    <strong style="color: var(--text-primary);">Grupo ${groupIndex + 1}</strong>
                    <button class="remove-group-btn" data-group="${groupIndex}" style="background: #ef4444; color: white; border: none; padding: 0.25rem 0.75rem; border-radius: 4px; cursor: pointer; font-size: 0.9rem;">✕ Remover Grupo</button>
                </div>
                <div class="config-input-group" style="margin-bottom: 0.5rem;">
                    <input type="text" class="tech-input" data-group="${groupIndex}" placeholder="Digite uma tecnologia e pressione Enter" style="flex: 1; padding: 0.75rem; border-radius: 8px; border: 2px solid var(--border-color); background: var(--bg-primary); color: var(--text-primary); font-size: 1rem;">
                    <button class="add-tech-btn" data-group="${groupIndex}" style="background: var(--accent-color); color: white; border: none; padding: 0.75rem 1.25rem; border-radius: 8px; cursor: pointer; font-size: 1rem; font-weight: 600;">+ Adicionar</button>
                </div>
                <div class="tech-tags" data-group="${groupIndex}" style="display: flex; flex-wrap: wrap; gap: 0.5rem;"></div>
            `;

            container.appendChild(groupCard);

            // Renderizar tags do grupo
            const tagsContainer = groupCard.querySelector('.tech-tags');
            group.forEach(tech => {
                const tag = document.createElement('span');
                tag.className = 'tag-item';
                tag.style.cssText = 'background: var(--accent-color); color: white; padding: 0.4rem 0.75rem; border-radius: 20px; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.5rem;';
                tag.innerHTML = `
                    ${tech}
                    <button class="remove-tag" style="background: transparent; border: none; color: white; cursor: pointer; font-size: 1.1rem; padding: 0; line-height: 1;">×</button>
                `;
                tag.querySelector('.remove-tag').addEventListener('click', () => {
                    this.removeTechFromGroup(groupIndex, tech);
                });
                tagsContainer.appendChild(tag);
            });

            // Event listeners
            const input = groupCard.querySelector('.tech-input');
            const addBtn = groupCard.querySelector('.add-tech-btn');
            const removeGroupBtn = groupCard.querySelector('.remove-group-btn');

            addBtn.addEventListener('click', () => {
                this.addTechToGroup(groupIndex, input.value.trim());
                input.value = '';
                input.focus();
            });

            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.addTechToGroup(groupIndex, input.value.trim());
                    input.value = '';
                    input.focus();
                }
            });

            removeGroupBtn.addEventListener('click', () => {
                this.removeTechGroup(groupIndex);
            });
        });

        // Adicionar listeners ao botão de adicionar grupo (fora do forEach)
        const addGroupBtn = document.getElementById('add-tech-group');
        if (addGroupBtn && !addGroupBtn.dataset.listenerAdded) {
            addGroupBtn.addEventListener('click', () => this.addTechGroup());
            addGroupBtn.dataset.listenerAdded = 'true';
        }
    },

    renderTagsForGroup(groupIndex) {
        const group = this.config.technologyGroups[groupIndex];
        const tagsContainer = document.querySelector(`.tech-tags[data-group="${groupIndex}"]`);
        if (!tagsContainer) return;

        tagsContainer.innerHTML = '';

        group.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tag-item';
            tag.style.cssText = 'background: var(--accent-color); color: white; padding: 0.4rem 0.75rem; border-radius: 20px; font-size: 0.9rem; display: inline-flex; align-items: center; gap: 0.5rem;';
            tag.innerHTML = `
                ${tech}
                <button class="remove-tag" style="background: transparent; border: none; color: white; cursor: pointer; font-size: 1.1rem; padding: 0; line-height: 1;">×</button>
            `;
            tag.querySelector('.remove-tag').addEventListener('click', () => {
                this.removeTechFromGroup(groupIndex, tech);
            });
            tagsContainer.appendChild(tag);
        });
    },

    // ========== GERENCIAMENTO DE OUTROS ITENS ==========

    addItem(type) {
        let input, list, configKey;
        
        switch(type) {
            case 'seniority':
                input = document.getElementById('seniority-input');
                list = 'seniorities';
                break;
            case 'city':
                input = document.getElementById('city-input');
                list = 'cities';
                break;
            case 'keyword':
                input = document.getElementById('keyword-input');
                list = 'keywords';
                break;
        }

        const value = input.value.trim();
        if (value && !this.config[list].includes(value)) {
            this.config[list].push(value);
            this.saveConfig();
            this.renderTags(type);
            input.value = '';
        }
    },

    removeItem(type, value) {
        let list;
        switch(type) {
            case 'seniority': list = 'seniorities'; break;
            case 'city': list = 'cities'; break;
            case 'keyword': list = 'keywords'; break;
        }

        this.config[list] = this.config[list].filter(item => item !== value);
        this.saveConfig();
        this.renderTags(type);
    },

    renderTags(type) {
        let container, list;
        
        switch(type) {
            case 'seniority':
                container = document.getElementById('seniority-list');
                list = this.config.seniorities;
                break;
            case 'city':
                container = document.getElementById('city-list');
                list = this.config.cities;
                break;
            case 'keyword':
                container = document.getElementById('keyword-list');
                list = this.config.keywords;
                break;
        }

        container.innerHTML = '';
        list.forEach(item => {
            const tag = document.createElement('span');
            tag.className = 'tag-item';
            tag.innerHTML = `
                ${item}
                <button class="remove-tag" aria-label="Remover ${item}">×</button>
            `;
            tag.querySelector('.remove-tag').addEventListener('click', () => {
                this.removeItem(type, item);
            });
            container.appendChild(tag);
        });
    },

    renderAllTags() {
        this.renderTags('seniority');
        this.renderTags('city');
        this.renderTags('keyword');
    },

    exportConfig() {
        const dataStr = JSON.stringify(this.config, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'job-search-config.json';
        link.click();
        URL.revokeObjectURL(url);
    },

    importConfig(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                this.config = JSON.parse(e.target.result);
                this.saveConfig();
                this.renderAllTags();
                this.updateLocationFields();
                document.getElementById('location-type').value = this.config.locationType;
                alert('✓ Configuração importada com sucesso!');
            } catch (error) {
                alert('❌ Erro ao importar arquivo. Verifique se é um JSON válido.');
                console.error(error);
            }
        };
        reader.readAsText(file);
        event.target.value = ''; // Limpar input
    },

    applyConfig() {
        if (this.config.technologyGroups.length === 0 || this.config.technologyGroups.every(group => group.length === 0)) {
            alert('⚠️ Adicione pelo menos um grupo com tecnologias antes de aplicar!');
            return;
        }

        // Resetar checkboxes de queries
        ChecklistManager.resetQueries();

        // Gerar queries dinamicamente
        this.updateQueries();
        
        // Mudar para aba diária
        const tabButton = document.querySelector('[data-tab="diaria"]');
        if (tabButton) tabButton.click();
        
        alert('✓ Configurações aplicadas! Suas queries foram geradas.');
    },

    updateQueries() {
        // Gerar queries para cada seção
        this.generateLinkedInPostsQueries();
        this.generateLinkedInJobsQueries();
        this.generateGoogleQueries();
        this.generateDuckDuckGoQueries();
        this.generateHybridCityQueries();

        // Garantir que os event listeners dos checkboxes estáticos sejam adicionados
        ChecklistManager.addStaticCheckboxListeners();
    },

    generateAllQueries() {
        // Mesmo que updateQueries, mas para carregamento inicial
        this.generateLinkedInPostsQueries();
        this.generateLinkedInJobsQueries();
        this.generateGoogleQueries();
        this.generateDuckDuckGoQueries();
        this.generateHybridCityQueries();
    },

    generateLinkedInPostsQueries() {
        const container = document.getElementById('linkedin-posts-queries');
        if (!container) return;
        
        container.innerHTML = '';

        this.config.technologyGroups.forEach((group, index) => {
            if (group.length === 0) return;

            const card = document.createElement('div');
            card.className = 'card';
            
            // Português
            const techsPt = group.slice(0, 2).join(' OR ');
            const keywordsPt = this.config.keywords.length > 0 
                ? this.config.keywords.join(' OR ') 
                : '(vaga OR contratando)';
            const queryPt = `(${techsPt}) AND ${keywordsPt} -presencial`;

            // Inglês
            const techsEn = group.slice(0, 2).join(' OR ');
            const keywordsEn = this.config.keywords.length > 0 
                ? this.config.keywords.join(' OR ') 
                : 'hiring';
            const queryEn = `(${techsEn}) AND ${keywordsEn}`;

            card.innerHTML = `
                <h4 style="margin-bottom: 1rem; color: var(--text-primary);">📋 Grupo ${index + 1}: ${group.slice(0, 2).join(', ')}</h4>
                
                <div style="margin-bottom: 1.5rem;">
                    <strong style="color: var(--text-primary); display: block; margin-bottom: 0.5rem;">🇧🇷 Busca em Português:</strong>
                    <div class="query-copy" style="position: relative;">
                        <code style="display: block; background: var(--code-bg); padding: 1rem; border-radius: 8px; color: var(--text-primary); font-family: 'Courier New', monospace; font-size: 0.95rem; line-height: 1.5; white-space: pre-wrap; word-break: break-word;">${queryPt}</code>
                        <button class="copy-btn" data-query="${this.escapeHtml(queryPt)}" style="position: absolute; top: 0.5rem; right: 0.5rem; background: var(--accent-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">📋 Copiar</button>
                    </div>
                </div>

                <div>
                    <strong style="color: var(--text-primary); display: block; margin-bottom: 0.5rem;">🇺🇸 Busca em Inglês:</strong>
                    <div class="query-copy" style="position: relative;">
                        <code style="display: block; background: var(--code-bg); padding: 1rem; border-radius: 8px; color: var(--text-primary); font-family: 'Courier New', monospace; font-size: 0.95rem; line-height: 1.5; white-space: pre-wrap; word-break: break-word;">${queryEn}</code>
                        <button class="copy-btn" data-query="${this.escapeHtml(queryEn)}" style="position: absolute; top: 0.5rem; right: 0.5rem; background: var(--accent-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">📋 Copiar</button>
                    </div>
                </div>
            `;

            container.appendChild(card);

            // Adicionar checkbox para a query
            ChecklistManager.addQueryCheckbox(card, 'diaria', index, 0, `Executar query do Grupo ${index + 1} (Posts)`);
        });

        // Adicionar event listeners aos botões de copiar
        this.setupCopyButtons();
    },

    generateLinkedInJobsQueries() {
        const container = document.getElementById('linkedin-jobs-queries');
        if (!container) return;
        
        container.innerHTML = '';

        this.config.technologyGroups.forEach((group, index) => {
            if (group.length === 0) return;

            const card = document.createElement('div');
            card.className = 'card';
            
            // Português
            const techsPt = group.slice(0, 2).join(' OR ');
            const queryPt = `${techsPt} -presencial`;

            // Inglês
            const techsEn = group.slice(0, 2).join(' OR ');
            const queryEn = `${techsEn}`;

            card.innerHTML = `
                <h4 style="margin-bottom: 1rem; color: var(--text-primary);">📋 Grupo ${index + 1}: ${group.slice(0, 2).join(', ')}</h4>
                
                <div style="margin-bottom: 1.5rem;">
                    <strong style="color: var(--text-primary); display: block; margin-bottom: 0.5rem;">🇧🇷 Busca em Português:</strong>
                    <div class="query-copy" style="position: relative;">
                        <code style="display: block; background: var(--code-bg); padding: 1rem; border-radius: 8px; color: var(--text-primary); font-family: 'Courier New', monospace; font-size: 0.95rem; line-height: 1.5; white-space: pre-wrap; word-break: break-word;">${queryPt}</code>
                        <button class="copy-btn" data-query="${this.escapeHtml(queryPt)}" style="position: absolute; top: 0.5rem; right: 0.5rem; background: var(--accent-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">📋 Copiar</button>
                    </div>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">Filtros visuais: Remoto/Híbrido + Senioridade</p>
                </div>

                <div>
                    <strong style="color: var(--text-primary); display: block; margin-bottom: 0.5rem;">🇺🇸 Busca em Inglês:</strong>
                    <div class="query-copy" style="position: relative;">
                        <code style="display: block; background: var(--code-bg); padding: 1rem; border-radius: 8px; color: var(--text-primary); font-family: 'Courier New', monospace; font-size: 0.95rem; line-height: 1.5; white-space: pre-wrap; word-break: break-word;">${queryEn}</code>
                        <button class="copy-btn" data-query="${this.escapeHtml(queryEn)}" style="position: absolute; top: 0.5rem; right: 0.5rem; background: var(--accent-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">📋 Copiar</button>
                    </div>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">Visual filters: Remote/Hybrid + Seniority</p>
                </div>
            `;

            container.appendChild(card);

            // Adicionar checkbox para a query
            ChecklistManager.addQueryCheckbox(card, 'diaria', index, 1, `Executar query do Grupo ${index + 1} (Jobs)`);
        });

        // Adicionar event listeners aos botões de copiar
        this.setupCopyButtons();
    },

    generateGoogleQueries() {
        const container = document.getElementById('google-company-queries');
        if (!container) return;
        
        container.innerHTML = '';

        const sites = [
            { name: 'Busca Geral', operator: '' },
            { name: 'LinkedIn', operator: 'site:linkedin.com ' },
            { name: 'Indeed', operator: 'site:indeed.com ' }
        ];

        this.config.technologyGroups.forEach((group, index) => {
            if (group.length === 0) return;

            const techs = group.map(t => `"${t}"`).join(' OR ');
            const seniority = this.config.seniorities.length > 0 
                ? this.config.seniorities.map(s => `"${s}"`).join(' OR ')
                : '"Junior" OR "Pleno" OR "Mid" OR "Senior"';
            const location = this.config.locationType === 'remoto' 
                ? '"remoto" OR "remote"'
                : this.config.locationType === 'hibrido'
                    ? '"híbrido" OR "hybrid"'
                    : '"presencial"';

            const baseQuery = `(${techs}) AND (${seniority}) AND (${location}) AND ("estamos contratando" OR "we are hiring" OR "vaga aberta" OR "open position")`;

            sites.forEach((site, siteIndex) => {
                const card = document.createElement('div');
                card.className = 'card';
                
                const query = site.operator + baseQuery;

                card.innerHTML = `
                    <h4 style="margin-bottom: 1rem; color: var(--text-primary);">📋 Grupo ${index + 1}: ${group.join(', ')} - ${site.name}</h4>
                    
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                        <div class="query-copy" style="position: relative; flex: 1;">
                            <code style="display: block; background: var(--code-bg); padding: 1rem 5rem 1rem 1rem; border-radius: 8px; color: var(--text-primary); font-family: 'Courier New', monospace; font-size: 0.95rem; line-height: 1.5; white-space: pre-wrap; word-break: break-word;">${query}</code>
                            <button class="copy-btn" data-query="${query.replace(/"/g, '&quot;')}" style="position: absolute; top: 0.5rem; right: 0.5rem; background: var(--accent-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">📋 Copiar</button>
                        </div>
                        <button class="go-btn" data-query="${query.replace(/"/g, '&quot;')}" style="background: #10b981; color: white; border: none; padding: 0.75rem 1.25rem; border-radius: 8px; cursor: pointer; font-size: 0.9rem; margin-left: 1rem; white-space: nowrap;">🔍 Ir</button>
                    </div>
                    <p style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
                        💡 Dica: Refine por data (Tools → Any time → Past week/month)
                    </p>
                `;

                container.appendChild(card);

                // Adicionar checkbox para a query
                ChecklistManager.addQueryCheckbox(card, 'diaria', index, 2 + siteIndex, `Executar query do Grupo ${index + 1} (${site.name})`);
            });
        });

        // Adicionar event listeners aos botões de copiar e ir
        this.setupCopyButtons();
        this.setupGoButtons();
    },

    generateDuckDuckGoQueries() {
        const container = document.getElementById('duckduckgo-queries');
        if (!container) return;
        
        container.innerHTML = '';

        const allTechs = this.config.technologyGroups.flat();
        if (allTechs.length === 0) return;

        const card = document.createElement('div');
        card.className = 'card';
        
        const techs = allTechs.map(t => `"${t}"`).join(' OR ');
        const seniority = this.config.seniorities.length > 0 
            ? this.config.seniorities.map(s => `"${s}"`).join(' OR ')
            : '"Junior" OR "Pleno" OR "Mid" OR "Jr"';
        
        // Inglês
        const keywordsEn = this.config.keywords.length > 0 
            ? this.config.keywords.join(' OR ') 
            : 'hiring';
        const queryEn = `(${techs}) AND ("developer" OR "engineer") AND (${keywordsEn}) AND (${seniority}) -Senior -Lead -Staff`;
        
        // Português
        const keywordsPt = this.config.keywords.length > 0 
            ? this.config.keywords.join(' OR ') 
            : '(vaga OR contratando)';
        const queryPt = `(${techs}) AND ("desenvolvedor" OR "programador") AND (${keywordsPt}) AND (${seniority}) -Senior -Lead -Staff`;

        card.innerHTML = `
            <div class="checkbox-query">
                <input type="checkbox" id="semanal-1">
                <label for="semanal-1">
                    <strong>Query: DuckDuckGo (Todas as Tecnologias)</strong>
                    <div class="query-copy" style="margin-top: 0.5rem;">
                        <span style="font-weight: 500; font-size: 0.9rem;">🇺🇸 Inglês:</span>
                        <div class="query-copy" style="position: relative; margin-top: 0.25rem;">
                            <code style="display: block; background: var(--code-bg); padding: 1rem; border-radius: 8px; color: var(--text-primary); font-family: 'Courier New', monospace; font-size: 0.95rem; line-height: 1.5; white-space: pre-wrap; word-break: break-word;">${queryEn}</code>
                            <button class="copy-btn" data-query="${this.escapeHtml(queryEn)}" style="position: absolute; top: 0.5rem; right: 0.5rem; background: var(--accent-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">📋 Copiar</button>
                        </div>
                    </div>
                    <div class="query-copy" style="margin-top: 0.5rem;">
                        <span style="font-weight: 500; font-size: 0.9rem;">🇧🇷 Português:</span>
                        <div class="query-copy" style="position: relative; margin-top: 0.25rem;">
                            <code style="display: block; background: var(--code-bg); padding: 1rem; border-radius: 8px; color: var(--text-primary); font-family: 'Courier New', monospace; font-size: 0.95rem; line-height: 1.5; white-space: pre-wrap; word-break: break-word;">${queryPt}</code>
                            <button class="copy-btn" data-query="${this.escapeHtml(queryPt)}" style="position: absolute; top: 0.5rem; right: 0.5rem; background: var(--accent-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">📋 Copiar</button>
                        </div>
                    </div>
                </label>
            </div>
        `;

        container.appendChild(card);

        // Adicionar event listeners aos botões de copiar
        this.setupCopyButtons();
    },

    generateHybridCityQueries() {
        const container = document.getElementById('hybrid-city-queries');
        if (!container) return;
        
        container.innerHTML = '';

        const allTechs = this.config.technologyGroups.flat();
        if (allTechs.length === 0 || this.config.cities.length === 0) return;

        const card = document.createElement('div');
        card.className = 'card';
        
        const techs = allTechs.map(t => `"${t}"`).join(' OR ');
        const seniority = this.config.seniorities.length > 0 
            ? this.config.seniorities.map(s => `"${s}"`).join(' OR ')
            : '"Junior" OR "Pleno" OR "Mid" OR "Jr"';
        const cities = this.config.cities.map(c => `"${c}"`).join(' OR ');
        
        const query = `(${techs}) AND ("developer" OR "desenvolvedor") AND (${seniority}) AND híbrido AND ((${cities}) OR "Remoto")`;

        card.innerHTML = `
            <div class="checkbox-query">
                <input type="checkbox" id="semanal-2">
                <label for="semanal-2">
                    <strong>Query: Busca Híbrida por Cidade</strong>
                    <div class="query-copy" style="position: relative; margin-top: 0.5rem;">
                        <code style="display: block; background: var(--code-bg); padding: 1rem; border-radius: 8px; color: var(--text-primary); font-family: 'Courier New', monospace; font-size: 0.95rem; line-height: 1.5; white-space: pre-wrap; word-break: break-word;">${query}</code>
                        <button class="copy-btn" data-query="${this.escapeHtml(query)}" style="position: absolute; top: 0.5rem; right: 0.5rem; background: var(--accent-color); color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer; font-size: 0.85rem;">📋 Copiar</button>
                    </div>
                </label>
            </div>
        `;

        container.appendChild(card);

        // Adicionar event listeners aos botões de copiar
        this.setupCopyButtons();
    },

    setupCopyButtons() {
        document.querySelectorAll('.copy-btn').forEach(btn => {
            // Remover listeners antigos
            const newBtn = btn.cloneNode(true);
            btn.replaceWith(newBtn);
            
            newBtn.addEventListener('click', () => {
                const query = newBtn.getAttribute('data-query');
                navigator.clipboard.writeText(query).then(() => {
                    const originalText = newBtn.textContent;
                    newBtn.textContent = '✓ Copiado!';
                    setTimeout(() => {
                        newBtn.textContent = originalText;
                    }, 2000);
                });
            });
        });
    },

    setupGoButtons() {
        document.querySelectorAll('.go-btn').forEach(btn => {
            // Remover listeners antigos
            const newBtn = btn.cloneNode(true);
            btn.replaceWith(newBtn);
            
            newBtn.addEventListener('click', () => {
                const query = newBtn.getAttribute('data-query').replace(/&quot;/g, '"');
                const url = 'https://www.google.com/search?q=' + encodeURIComponent(query);
                window.open(url, '_blank');
            });
        });
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

const ChecklistManager = {
    checkedItems: {}, // {id: {checked: true, date: '2026-02-10'}}

    init() {
        this.load();
        this.setupEventListeners();
        this.render();
    },

    load() {
        const saved = localStorage.getItem('checklistState');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                this.checkedItems = parsed.checkedItems || {};
            } catch (e) {
                console.error('Erro ao carregar checklist:', e);
            }
        }
    },

    save() {
        localStorage.setItem('checklistState', JSON.stringify({
            checkedItems: this.checkedItems
        }));
    },

    setupEventListeners() {
        // Reset buttons
        document.getElementById('reset-diaria').addEventListener('click', () => this.resetDaily());
        document.getElementById('reset-semanal').addEventListener('click', () => this.resetWeekly());

        // Adicionar event listeners aos checkboxes estáticos
        this.addStaticCheckboxListeners();
    },

    addStaticCheckboxListeners() {
        const staticCheckboxes = document.querySelectorAll('input[type="checkbox"]:not([id^="query-"])');
        staticCheckboxes.forEach(checkbox => {
            if (!checkbox.dataset.listenerAdded) {
                checkbox.addEventListener('change', () => {
                    this.onCheckboxChange(checkbox.id);
                });
                checkbox.dataset.listenerAdded = 'true';
            }
        });
    },

    onCheckboxChange(id) {
        const checkbox = document.getElementById(id);
        if (checkbox.checked) {
            const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            this.checkedItems[id] = { checked: true, date: today };
            this.save();
            this.render();
        }
    },

    shouldShow(id) {
        const isChecked = this.checkedItems[id] && this.checkedItems[id].checked;
        const section = id.includes('diaria') ? 'diaria' : 'semanal';

        if (!isChecked) return true;

        const checkedDate = new Date(this.checkedItems[id].date);
        const today = new Date();
        const todayStr = today.toISOString().split('T')[0];

        if (section === 'diaria') {
            // Reaparecer no dia seguinte
            return checkedDate.toISOString().split('T')[0] !== todayStr;
        } else {
            // Semanal: reaparecer na semana seguinte
            const checkedWeek = this.getWeekNumber(checkedDate);
            const currentWeek = this.getWeekNumber(today);
            return checkedWeek !== currentWeek;
        }
    },

    getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    },

    render() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            const li = checkbox.closest('li');
            if (li) {
                if (this.shouldShow(checkbox.id)) {
                    li.style.display = 'list-item';
                } else {
                    li.style.display = 'none';
                }
            } else {
                // Para checkboxes de queries, que não estão em li
                const container = checkbox.closest('.card');
                if (container) {
                    if (this.shouldShow(checkbox.id)) {
                        container.style.display = 'block';
                    } else {
                        container.style.display = 'none';
                    }
                }
            }
        });

        // Verificar se todos os checkboxes da seção diária estão ocultos
        this.checkCongratulations('diaria');
    },

    checkCongratulations(section) {
        const sectionElement = document.getElementById(section);
        if (!sectionElement) return;

        const checkboxes = sectionElement.querySelectorAll('input[type="checkbox"]');
        const allHidden = Array.from(checkboxes).every(cb => {
            const li = cb.closest('li');
            if (li) {
                return li.style.display === 'none';
            } else {
                const container = cb.closest('.card');
                return container && container.style.display === 'none';
            }
        });

        const checklistContainer = document.getElementById('checklist-final-container');
        const congratsMessage = document.getElementById('congratulations-message');

        if (allHidden && checkboxes.length > 0) {
            if (checklistContainer) checklistContainer.style.display = 'none';
            if (congratsMessage) congratsMessage.style.display = 'block';
        } else {
            if (checklistContainer) checklistContainer.style.display = 'block';
            if (congratsMessage) congratsMessage.style.display = 'none';
        }
    },

    resetQueries() {
        // Resetar apenas checkboxes de queries, não os de conclusão
        Object.keys(this.checkedItems).forEach(id => {
            if (id.startsWith('query-')) {
                delete this.checkedItems[id];
            }
        });
        this.save();
        this.render();
    },

    resetDaily() {
        // Resetar checkboxes da seção diária
        Object.keys(this.checkedItems).forEach(id => {
            if (id.includes('diaria') || id.startsWith('query-diaria')) {
                delete this.checkedItems[id];
            }
        });
        this.save();
        this.render();
    },

    resetWeekly() {
        // Resetar checkboxes da seção semanal
        Object.keys(this.checkedItems).forEach(id => {
            if (id.includes('semanal') || id.startsWith('query-semanal')) {
                delete this.checkedItems[id];
            }
        });
        this.save();
        this.render();
    },

    addQueryCheckbox(card, section, groupIndex, queryIndex, label) {
        const checkboxId = `query-${section}-${groupIndex}-${queryIndex}`;
        const checkboxDiv = document.createElement('div');
        checkboxDiv.style.cssText = 'display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; padding: 0.75rem; background: var(--bg-secondary); border-radius: 8px; border: 2px solid var(--border-color);';
        checkboxDiv.innerHTML = `
            <input type="checkbox" id="${checkboxId}" style="margin: 0;">
            <label for="${checkboxId}" style="margin: 0; flex: 1; cursor: pointer; font-weight: 500; color: var(--text-primary);">
                ${label}
            </label>
        `;
        card.insertBefore(checkboxDiv, card.firstChild);

        // Adicionar event listener
        const checkbox = checkboxDiv.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            this.onCheckboxChange(checkbox.id);
        });
    }
};

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    ConfigManager.init();
    ChecklistManager.init();
});
