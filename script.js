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
