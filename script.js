const initLoader = () => {
    const loader = document.getElementById('loader');
    const progress = document.querySelector('.loading-progress');
    
    let currentProgress = 0;
    const loadSpeed = 25;
    
    const interval = setInterval(() => {
        currentProgress += loadSpeed;
        if (currentProgress > 100) currentProgress = 100;
        
        progress.style.width = currentProgress + '%';
        
        if (currentProgress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hide');
                initCosmicEffects();
            }, 300);
        }
    }, 50);
};

const initCosmicEffects = () => {
    createCosmosBackground();
    createStarsBackground();
    initParticleSystem();
    initNavEffects();
    initScrollAnimations();
    initHeroAnimations();
    initCapabilityCards();
    initProjectInteractions();
    initImageViewer();
    initCosmicCursor();
};

const createCosmosBackground = () => {
    const canvas = document.getElementById('cosmos-bg');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
    );
    
    gradient.addColorStop(0, '#1a0033');
    gradient.addColorStop(0.5, '#0a0015');
    gradient.addColorStop(1, '#000000');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
};

const createStarsBackground = () => {
    const canvas = document.getElementById('stars-bg');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = [];
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            brightness: Math.random(),
            twinkleSpeed: 0.005 + Math.random() * 0.01
        });
    }
    
    const drawStars = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            star.brightness += star.twinkleSpeed;
            if (star.brightness > 1 || star.brightness < 0) {
                star.twinkleSpeed = -star.twinkleSpeed;
            }
            
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
            ctx.fill();
            
            if (star.size > 1) {
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#7c3aed';
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        });
        
        requestAnimationFrame(drawStars);
    };
    
    drawStars();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
};

const initParticleSystem = () => {
    const container = document.querySelector('.nebula-container');
    if (!container) return;
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    const nebulas = container.querySelectorAll('.nebula');
    
    const animateNebulas = () => {
        nebulas.forEach((nebula, index) => {
            const rect = nebula.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (mouseX - centerX) * 0.05;
            const deltaY = (mouseY - centerY) * 0.05;
            
            nebula.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });
        
        requestAnimationFrame(animateNebulas);
    };
    
    animateNebulas();
};

const initNavEffects = () => {
    const nav = document.querySelector('.cosmic-nav');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.querySelector('.nav-links');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    if (toggle) {
        toggle.addEventListener('click', () => {
            links.classList.toggle('active');
            toggle.classList.toggle('active');
        });
    }
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('mouseenter', () => {
            const glow = link.querySelector('.nav-glow');
            if (glow) {
                glow.style.boxShadow = '0 0 20px var(--cosmic-purple)';
            }
        });
        
        link.addEventListener('mouseleave', () => {
            const glow = link.querySelector('.nav-glow');
            if (glow) {
                glow.style.boxShadow = '0 0 10px var(--cosmic-purple)';
            }
        });
    });
};

const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                if (entry.target.classList.contains('capability-planet')) {
                    entry.target.style.animation = 'planet-appear 0.8s ease forwards';
                }
                
                if (entry.target.classList.contains('project-nebula')) {
                    entry.target.style.animation = 'nebula-form 1s ease forwards';
                }
            }
        });
    }, observerOptions);
    
    const elements = document.querySelectorAll('.capability-planet, .project-nebula, .stat-display');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(50px)';
        observer.observe(el);
    });
};

const initHeroAnimations = () => {
    const heroLogo = document.querySelector('.hero-logo');
    if (heroLogo) {
        heroLogo.addEventListener('mouseenter', () => {
            heroLogo.style.transform = 'scale(1.1)';
        });
        
        heroLogo.addEventListener('mouseleave', () => {
            heroLogo.style.transform = 'scale(1)';
        });
    }
    
    initCosmicTyping();
};

const initCosmicTyping = () => {
    const codeDisplay = document.getElementById('cosmic-code');
    if (!codeDisplay) return;
    
    const codeSnippets = [
        `-- ADVANCED COMBAT SYSTEM
local CombatSystem = {}
CombatSystem.__index = CombatSystem

function CombatSystem.new(player)
    local self = setmetatable({}, CombatSystem)
    self.player = player
    self.combos = {}
    self.damage_multiplier = 1.0
    return self
end

function CombatSystem:ExecuteCombo(sequence)
    local damage = self:CalculateDamage(sequence)
    local targets = self:GetTargets()
    
    for _, target in pairs(targets) do
        self:ApplyDamage(target, damage)
    end
end`,

        `-- DATA PERSISTENCE MODULE
local DataStore = game:GetService("DataStoreService")
local PlayerData = DataStore:GetDataStore("PlayerData")

function SavePlayerData(player)
    local data = {
        Level = player.leaderstats.Level.Value,
        Experience = player.leaderstats.Experience.Value,
        Currency = player.leaderstats.Currency.Value,
        Inventory = SerializeInventory(player)
    }
    
    local success, error = pcall(function()
        PlayerData:SetAsync(player.UserId, data)
    end)
    
    return success
end`,

        `-- ABILITY SYSTEM FRAMEWORK
local AbilitySystem = {}

function AbilitySystem:RegisterAbility(config)
    local ability = {
        Name = config.Name,
        Cooldown = config.Cooldown,
        Damage = config.Damage,
        Effects = config.Effects or {},
        Execute = config.Execute
    }
    
    self.Abilities[config.Name] = ability
    return ability
end

function AbilitySystem:CastAbility(abilityName, caster, target)
    local ability = self.Abilities[abilityName]
    if not ability then return false end
    
    if self:CheckCooldown(caster, abilityName) then
        ability.Execute(caster, target)
        self:StartCooldown(caster, abilityName)
        return true
    end
    
    return false
end`,

        `-- UI FRAMEWORK
local UIManager = {}
UIManager.__index = UIManager

function UIManager.new(player)
    local self = setmetatable({}, UIManager)
    self.player = player
    self.screens = {}
    self:Initialize()
    return self
end

function UIManager:CreateScreen(screenName, properties)
    local screen = Instance.new("ScreenGui")
    screen.Name = screenName
    screen.ResetOnSpawn = properties.ResetOnSpawn or false
    
    self.screens[screenName] = screen
    screen.Parent = self.player.PlayerGui
    
    return screen
end`
    ];
    
    let currentSnippet = 0;
    let currentChar = 0;
    let currentText = '';
    const cursor = document.querySelector('.code-cursor');
    
    const typeNextChar = () => {
        if (currentChar < codeSnippets[currentSnippet].length) {
            currentText += codeSnippets[currentSnippet][currentChar];
            codeDisplay.textContent = currentText;
            currentChar++;
            
            const typingSpeed = 30 + Math.random() * 50;
            setTimeout(typeNextChar, typingSpeed);
        } else {
            setTimeout(() => {
                currentText = '';
                currentChar = 0;
                currentSnippet = (currentSnippet + 1) % codeSnippets.length;
                codeDisplay.textContent = '';
                typeNextChar();
            }, 3000);
        }
    };
    
    typeNextChar();
};

const initCapabilityCards = () => {
    const cards = document.querySelectorAll('.capability-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '1';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const glow = card.querySelector('.card-glow');
            if (glow) {
                glow.style.opacity = '0';
            }
        });
    });
};

const initProjectInteractions = () => {
    const fullscreenBtns = document.querySelectorAll('.fullscreen-btn');
    
    fullscreenBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const videoContainer = btn.closest('.project-video-container');
            const video = videoContainer.querySelector('video');
            const iframe = videoContainer.querySelector('iframe');
            
            if (video) {
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen();
                } else if (video.msRequestFullscreen) {
                    video.msRequestFullscreen();
                }
            } else if (iframe) {
                if (iframe.requestFullscreen) {
                    iframe.requestFullscreen();
                } else if (iframe.webkitRequestFullscreen) {
                    iframe.webkitRequestFullscreen();
                } else if (iframe.msRequestFullscreen) {
                    iframe.msRequestFullscreen();
                }
            }
        });
    });
    
    initFilterSystem();
};

const initFilterSystem = () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            projects.forEach(project => {
                const category = project.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    project.style.display = 'block';
                    setTimeout(() => {
                        project.style.opacity = '1';
                        project.style.transform = 'translateY(0) scale(1)';
                    }, 10);
                } else {
                    project.style.opacity = '0';
                    project.style.transform = 'translateY(50px) scale(0.9)';
                    setTimeout(() => {
                        project.style.display = 'none';
                    }, 500);
                }
            });
        });
    });
};

const initImageViewer = () => {
    const viewer = document.getElementById('imageViewer');
    const images = document.querySelectorAll('.testimonial-image');
    const closeBtn = document.querySelector('.viewer-close');
    const viewerImage = document.getElementById('viewerImage');
    
    images.forEach(image => {
        image.addEventListener('click', () => {
            const img = image.querySelector('img');
            viewerImage.src = img.src;
            viewer.style.display = 'block';
            setTimeout(() => {
                viewer.style.opacity = '1';
            }, 10);
        });
    });
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            viewer.style.opacity = '0';
            setTimeout(() => {
                viewer.style.display = 'none';
            }, 300);
        });
    }
    
    const backdrop = document.querySelector('.viewer-backdrop');
    if (backdrop) {
        backdrop.addEventListener('click', () => {
            viewer.style.opacity = '0';
            setTimeout(() => {
                viewer.style.display = 'none';
            }, 300);
        });
    }
};

const initCosmicCursor = () => {
    const cursor = document.createElement('div');
    cursor.className = 'cosmic-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--cosmic-purple);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
        position: fixed;
        width: 40px;
        height: 40px;
        background: radial-gradient(circle, rgba(124, 58, 237, 0.3), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9998;
        transition: transform 0.3s ease;
    `;
    document.body.appendChild(trail);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        
        setTimeout(() => {
            trail.style.left = e.clientX - 20 + 'px';
            trail.style.top = e.clientY - 20 + 'px';
        }, 100);
    });
    
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });
    
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });
};

const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
};

const init3DEffects = () => {
    let tiltX = 0;
    let tiltY = 0;
    
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        tiltX += (x - tiltX) * 0.1;
        tiltY += (y - tiltY) * 0.1;
        
        document.querySelectorAll('.holographic-terminal, .project-nebula, .capability-planet').forEach(el => {
            el.style.transform = `perspective(1000px) rotateY(${tiltX * 0.5}deg) rotateX(${-tiltY * 0.5}deg)`;
        });
    });
};

document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initSmoothScroll();
    init3DEffects();
});

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

const style = document.createElement('style');
style.textContent = `
@keyframes particle-orbit {
    from { transform: translate(-50%, -50%) rotate(0deg) translateX(100px) rotate(0deg); }
    to { transform: translate(-50%, -50%) rotate(360deg) translateX(100px) rotate(-360deg); }
}

@keyframes planet-appear {
    from { opacity: 0; transform: translateY(50px) scale(0.5); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes nebula-form {
    from { opacity: 0; transform: translateY(50px) scale(0.8) rotate(-5deg); }
    to { opacity: 1; transform: translateY(0) scale(1) rotate(0deg); }
}
`;
document.head.appendChild(style);