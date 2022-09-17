
//url de la apo
const API = 'https://youtube-v31.p.rapidapi.com/search?channelId=UCz0lWfV3tgZQ04ttGnW4xwA&part=snippet%2Cid&order=date&maxResults=5';

const content = null || document.getElementById('content')
//metodos de acceso a la api
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '8a88d3dddfmsh4658f9dafd15d8bp144612jsna933cadc0f8f',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
};

//Lógica de async: ir por los datos, luego esperar por ellos y finalmente retornarlos hacia el usuario
async function fetchData(urlApi){
  //hacemos uso del fetch y de parametro le pasamos la url y los datos de acceso a la api
  const response = await fetch(urlApi, options);
  //esperamos a que nos traiga los datos y los convertimos a json
  const data = await response.json();
  //retorna la info de la api que pedimos
  return data;
}



//funcion anonima que se llama a si  misma al ejecutar el programa implementando el async await
(async () => {
  try{
    const videos = await fetchData (API);
     let view = `
     ${videos.items.map(video => `
          <div class="group relative">
            <div
              class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
              <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
            </div>
            <div class="mt-4 flex justify-between">
              <h3 class="text-sm text-gray-700">
                <span aria-hidden="true" class="absolute inset-0"></span>
                ${video.snippet.title}
              </h3>
            </div>
          </div>
     `).slice(0,4).join('')}
     `;
     content.innerHTML = view;
  }catch(error){
    console.log(error); 
  }
})();