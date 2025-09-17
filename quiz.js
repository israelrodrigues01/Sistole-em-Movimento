const quizData = [
    {
        q: 'Qual estrutura é considerada o marcapasso natural do coração?',
        a: ['Nódulo atrioventricular (AV)', 'Nódulo sinoatrial (SA)', 'Feixe de His', 'Fibras de Purkinje'],
        correct: 1
    },
    {
        q: 'O que acontece durante a sístole atrial?',
        a: ['Relaxamento dos átrios', 'Contração dos átrios, enchendo os ventrículos', 'Fechamento das valvas semilunares', 'Ejeção de sangue para a aorta'],
        correct: 1
    },
    {
        q: 'Qual a função do atraso no nódulo atrioventricular (AV)?',
        a: ['Impedir a contração dos ventrículos', 'Permitir o esvaziamento total dos átrios', 'Fechar as valvas atrioventriculares', 'Aumentar a frequência cardíaca'],
        correct: 1
    },
    {
        q: 'Durante a sístole ventricular, o sangue é bombeado para:',
        a: ['Artéria pulmonar e aorta', 'Átrios direito e esquerdo', 'Veias cavas', 'Veias pulmonares'],
        correct: 0
    },
    {
        q: 'O fechamento das valvas atrioventriculares (mitral e tricúspide) produz qual som cardíaco?',
        a: ['Sopros cardíacos', 'Segunda bulha (B2)', 'Primeira bulha (B1)', 'Terceira bulha (B3)'],
        correct: 2
    },
    {
        q: 'O que ocorre na diástole ventricular?',
        a: ['Ventrículos se contraem', 'Ventrículos relaxam e se enchem de sangue', 'Valvas semilunares se abrem', 'Átrios se contraem'],
        correct: 1
    },
    {
        q: 'Qual sequência representa corretamente o caminho do impulso elétrico no coração?',
        a: ['Feixe de His → Nódulo SA → Nódulo AV → Purkinje', 'Nódulo SA → Nódulo AV → Feixe de His → Purkinje', 'Nódulo AV → Nódulo SA → Purkinje → Feixe de His', 'Purkinje → Nódulo SA → Feixe de His → Nódulo AV'],
        correct: 1
    },
    {
        q: 'Durante a ejeção de sangue para o corpo, qual ventrículo está atuando?',
        a: ['Direito', 'Esquerdo', 'Ambos ao mesmo tempo', 'Nenhum, apenas os átrios'],
        correct: 1
    },
    {
        q: 'O fechamento das valvas semilunares ocorre em qual fase?',
        a: ['Sístole atrial', 'Sístole ventricular', 'Início da diástole', 'Repouso atrial'],
        correct: 2
    },
    {
        q: 'Qual é a ordem correta das fases do ciclo cardíaco?',
        a: ['Sístole ventricular → Sístole atrial → Diástole', 'Diástole → Sístole atrial → Sístole ventricular → Diástole', 'Sístole atrial → Diástole → Sístole ventricular', 'Sístole atrial → Sístole ventricular → Repouso permanente'],
        correct: 1
    },
];


const quizArea = document.getElementById('quizArea');
const answers = new Array(quizData.length).fill(null);

function renderQuiz() {
    quizArea.innerHTML = '';
    quizData.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'mb-4';

        const q = document.createElement('h5');
        q.textContent = (idx + 1) + '. ' + item.q;
        q.classList.add('fw-bold', 'mb-3');
        div.appendChild(q);

        const btnGroup = document.createElement('div');
        btnGroup.className = 'd-flex flex-wrap flex-md-nowrap flex-column flex-md-row gap-3';

        item.a.forEach((opt, i) => {
            const b = document.createElement('button');
            b.className = 'btn btn-outline-secondary w-100 w-md-25';
            b.textContent = opt;
            b.setAttribute('data-q', idx);
            b.setAttribute('data-opt', i);
            b.addEventListener('click', () => selectOption(b));
            btnGroup.appendChild(b);
        });

        div.appendChild(btnGroup);
        quizArea.appendChild(div);
    });
}

function selectOption(btn) {
    const q = Number(btn.getAttribute('data-q'));
    const opt = Number(btn.getAttribute('data-opt'));

    const parent = btn.parentNode;
    parent.querySelectorAll('button').forEach(o => {
        o.classList.remove('active');
    });

    btn.classList.add('active');
    answers[q] = opt;
}

function submitQuiz() {
    let score = 0;
    let unanswered = 0;

    quizData.forEach((item, i) => {
        const ans = answers[i];
        if (ans === null) { unanswered++; return; }

        const parent = quizArea.children[i].querySelectorAll('button');
        parent.forEach((o, idx) => {
            o.disabled = true;
            if (idx === item.correct) {
                o.classList.add('bg-success');
                o.classList.add('text-white');
            }
            if (idx === ans && ans !== item.correct) {
                o.classList.add('bg-danger');
                o.classList.add('text-white');
            }
        });

        if (ans === item.correct) score++;
    });

    const result = document.getElementById('result');
    result.innerHTML = `Pontuação: ${score} / ${quizData.length}` +
        (unanswered ? ` <span class="text-muted">(${unanswered} sem resposta)</span>` : '');
}

function resetQuiz() {
    answers.fill(null);
    renderQuiz();
    document.getElementById('result').textContent = '';
}

// inicializa
renderQuiz();
