document.getElementById('save-button').addEventListener('click', async () => {
    // Captura dos valores dos campos com IDs corretos
    const diaSemana = document.getElementById('day').value;
    const polo = document.getElementById('pole').value;
    const nomeSala = document.getElementById('nomeSala').value;
    const primeiroHorario = document.getElementById('primeiroHorario').value;
    const segundoHorario = document.getElementById('segundoHorario').value;
  
    // Verificação para garantir que os campos obrigatórios estejam preenchidos
    if (!diaSemana || !polo || !nomeSala) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
  
    try {
      // Salvando a sala
      const salaResponse = await fetch('/salvar-sala', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome_sala: nomeSala, polo })
      });
  
      const salaResult = await salaResponse.json();
      console.log('Resposta ao salvar sala:', salaResult);
  
      if (salaResult.success) {
        // Salvando as aulas após a sala
        const aulasResponse = await fetch('/salvar-aulas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dia_semana: diaSemana,
            primeiro_horario: primeiroHorario || null,
            segundo_horario: segundoHorario || null,
            sala_id: salaResult.salaId // Usando o ID retornado do salvamento da sala
          })
        });
  
        const aulasResult = await aulasResponse.json();
        console.log('Resposta ao salvar aulas:', aulasResult);
  
        if (aulasResult.success) {
          alert('Sala e aulas salvas com sucesso!');
        } else {
          alert('Erro ao salvar aulas.');
        }
      } else {
        alert('Erro ao salvar sala.');
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar os dados.');
    }
  });
  