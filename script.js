// Importação do Firebase para a funcionalidade de autenticação
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { app } from './firebaseConfig'; // Certifique-se de que o caminho está correto

const auth = getAuth(app);
auth.languageCode = 'pt';

// Função para configurar o reCAPTCHA invisível e enviar o código de redefinição de senha
function sendPasswordResetCode(phoneNumber) {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
            // reCAPTCHA resolvido, então prosseguir com o envio do código
        }
    }, auth);

    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            alert("Código de redefinição de senha enviado com sucesso!");
        }).catch((error) => {
            console.error("Erro ao enviar o código de redefinição de senha:", error);
        });
}

// Código para o campo de número de telefone na tela de registro
const phoneNumberInput = document.getElementById('phone-number');
if (phoneNumberInput) {
    phoneNumberInput.addEventListener('input', function (e) {
        // Remove qualquer caractere que não seja número
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}

// Código para o campo de número de telefone na tela de login
const loginPhoneInput = document.getElementById('login-phone');
if (loginPhoneInput) {
    loginPhoneInput.addEventListener('input', function (e) {
        // Remove qualquer caractere que não seja número
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}

// Adiciona um evento para o link "Esqueci minha senha"
const forgotPasswordLink = document.querySelector('a[href="#"]');
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        const phoneNumber = '+55' + loginPhoneInput.value;
        if (phoneNumber) {
            sendPasswordResetCode(phoneNumber);
        } else {
            alert("Por favor, insira seu número de telefone.");
        }
    });
}

// Adiciona o elemento de reCAPTCHA invisível
const recaptchaContainer = document.createElement('div');
recaptchaContainer.id = 'recaptcha-container';
document.body.appendChild(recaptchaContainer);

// SCRIPT DA TELA PRINCIPAL ABAIXO

// Função para gerar uma notificação de recarga aleatória
function generateRandomRecharge() {
    // Gera um número de conta aleatório (4 dígitos)
    const accountNumber = Math.floor(1000 + Math.random() * 9000);
    // Gera um valor de recarga aleatório entre R$100 e R$5000
    const rechargeAmount = (Math.random() * (5000 - 100) + 100).toFixed(2);
    // Gera o número final da conta (últimos 4 dígitos)
    const endAccountNumber = Math.floor(1000 + Math.random() * 9000);

    // Atualiza o conteúdo da notificação com os valores gerados
    const notification = document.getElementById('rechargeNotification');
    notification.innerHTML = `<p><span class="notification-highlight">*${accountNumber}</span> Recarregou R$ ${rechargeAmount} ******${endAccountNumber} <span class="recarregar">Recar</span></p>`;

    // Adiciona a classe de animação
    notification.classList.add('animate');

    // Remove a classe de animação após 0.5s para reiniciar a animação no próximo update
    setTimeout(() => {
        notification.classList.remove('animate');
    }, 500);
}

// Atualiza a notificação a cada 3 segundos
setInterval(generateRandomRecharge, 3000);

// Inicia com uma notificação assim que a página carregar
window.onload = generateRandomRecharge;

// SCRIPT TELA DE RETIRADA

// Função para mostrar os campos de acordo com a opção selecionada
function selectOption(option) {
    // Oculta todos os campos de saque
    document.getElementById('saque-info-cpf').style.display = 'none';
    document.getElementById('saque-info-telefone').style.display = 'none';

    // Exibe o campo correspondente à opção selecionada
    if (option === 'cpf') {
        document.getElementById('saque-info-cpf').style.display = 'block';
    } else if (option === 'telefone') {
        document.getElementById('saque-info-telefone').style.display = 'block';
    }
}

// FUNÇÕES PARA A TELA EQUIPE

// Função para gerar um código de convite aleatório
function generateInviteCode() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let inviteCode = '';
    for (let i = 0; i < 8; i++) {
        inviteCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return inviteCode;
}

// Função para definir o código e o link de convite no HTML
function setInviteDetails() {
    const inviteCode = generateInviteCode();
    document.getElementById('inviteCode').value = inviteCode;
    document.getElementById('inviteLink').value = `https://seudominio.com/register?codigo=${inviteCode}`;
}

// Função para copiar o conteúdo para a área de transferência
function copyToClipboard(elementId) {
    const copyText = document.getElementById(elementId);
    copyText.select();
    document.execCommand('copy');
    alert("Texto copiado para a área de transferência!");
}

// Chamar a função para definir o código e o link de convite ao carregar a página
window.onload = setInviteDetails;
