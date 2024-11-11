document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('save-button').addEventListener('click', async () => {
      const nome_sala = document.getElementById('nome_sala').value;
      const polo = document.getElementById('polo').value;
      const dia_semana = document.getElementById('dia-semana').value;
      const primeiro_horario = document.getElementById('primeiro_horario').value;
      const segundo_horario = document.getElementById('segundo_horario').value;

      console.log('Dados enviados:', {
          nome_sala,
          polo,
          dia_semana,
          primeiro_horario,
          segundo_horario
      });

      try {
          const response = await fetch('/salvar-aulas', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ nome_sala, polo, dia_semana, primeiro_horario, segundo_horario }),
          });

          const result = await response.json();

          if (result.success) {
              alert('Aulas salvas com sucesso!');
          } else {
              alert('Erro ao salvar aulas: ' + result.message);
          }
      } catch (error) {
          console.error('Erro ao enviar dados:', error);
          alert('Erro ao enviar dados.');
      }
  });

  // Adicione um evento para o botão "Adicionar Linha", se necessário
});


    document.addEventListener('DOMContentLoaded', () => {
      fetch('/views')
        .then(response => response.json())
        .then(data => {
          document.getElementById('access-popup').innerText = `Acessos: ${data.views}`;
        })
        .catch(error => console.error('Erro ao buscar acessos:', error));
    });


document.getElementById('buscar').addEventListener('click', async () => {
    const diaSemana = document.getElementById('dia-semana').value;
    const polo = document.getElementById('polo').value;

    if (!diaSemana || !polo) {
      alert('Por favor, selecione o dia e o polo.');
      return;
    }

    try {
      const response = await fetch(`/buscar-aulas?dia_semana=${diaSemana}&polo=${polo}`);
      const result = await response.json();

      if (result.success) {
        const aulas = result.data;

        // Limpa os campos antes de preencher com novos dados
        document.querySelectorAll('.column input').forEach(input => input.value = '');

        // Preenchendo os valores das aulas nos inputs correspondentes
        aulas.forEach((aula, index) => {
          if (index < 6) { // Limitando a quantidade de resultados exibidos
            document.querySelectorAll('.column')[0].querySelectorAll('input')[index].value = aula.nome_sala || '';
            document.querySelectorAll('.column')[1].querySelectorAll('input')[index].value = aula.primeiro_horario || '';
            document.querySelectorAll('.column')[2].querySelectorAll('input')[index].value = aula.segundo_horario || '';
          }
        });

      } else {
        alert('Erro ao buscar aulas. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao buscar aulas:', error);
      alert('Erro ao buscar aulas. Por favor, tente novamente.');
    }
  });
