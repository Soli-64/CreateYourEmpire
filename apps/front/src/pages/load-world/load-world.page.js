import { verifyDataSignature } from '../../scripts/backFunctions.js';
import { elements } from '../../scripts/utils.js';
import '../../css/style.scss'

const dropzone = document.getElementById('dropzone');

// Écouter l'événement "dragover" pour le glisser-déposer
dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.classList.add('dragover');
});

// Écouter l'événement "dragleave" pour le glisser-déposer
dropzone.addEventListener('dragleave', () => {
  dropzone.classList.remove('dragover');
});

// Écouter l'événement "drop" pour le glisser-déposer
dropzone.addEventListener('drop', async (e) => {
  e.preventDefault();
  dropzone.classList.remove('dragover');

  const file = e.dataTransfer.files[0];
  await handleFile(file);
});

// Écouter l'événement "change" pour la sélection de fichier via le bouton de sélection de fichier
dropzone.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  await handleFile(file);
});

// Fonction pour gérer le fichier sélectionné
async function handleFile(file) {
  const reader = new FileReader();

  reader.addEventListener('load', async () => {
    let content = reader.result;

    if (typeof content === 'string') {
      console.log('Contenu du fichier (string) :', content);
    } else {
      content = JSON.stringify(content);
      console.log('Contenu du fichier (JSON) :', content);
    }

    document.querySelector('#worlds-icons-container').append(
      elements.createElement('img', { class: 'world-icon', src: '/public/images/icons/files/worldfile.png', id: 'world-icon' }, '')
    );

    document.querySelector('#world-icon').addEventListener('click', async () => {
      document.querySelector('#worldname').innerHTML = file.name;
      document.querySelector('.get-signature').style.display = 'block';

      document.querySelector('#valid-signature').addEventListener('click', async () => {
        const signature = document.querySelector('#signature-input').value;
        console.log('Signature :', signature);
        console.log('Contenu :', content);

        // Vérification de la signature
        const signatureIsTrue = await verifyDataSignature(JSON.parse(content), signature);

        if (signatureIsTrue) {
          const link = elementscreateElement('a', { href: `/src/pages/world/world.html?mode=load&content=${content}` }, '');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.log('Mauvaise Signature');
        }
      });
    });
  }, false);

  reader.readAsText(file);
}
