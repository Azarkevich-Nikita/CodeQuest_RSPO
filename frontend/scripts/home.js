async function addNews(newsData) {
    const newsContainer = document.getElementById("home-hero");

    const card = document.createElement("article");
    card.className = "home-card";

    card.innerHTML = `
        <h2 class="home-card__title" style="font-size: 1.5rem;">${newsData?.title || "Новое событие"}</h2>
        <p class="home-card__time" style="font-size: 0.85rem;">
            ${newsData?.newsText || "Описание новости с бэкенда."}
        </p>
    `;

    newsContainer.prepend(card);
}

async function getData() {
  try {
    const response = await fetch('http://localhost:8080/api/contests');
    if (!response.ok) {
      throw new Error('Ошибка сети');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

async function getContests() {
    const data = await getData();
    if (!data || data.length === 0) return;

    const newsContainer = document.getElementById("home-sidebar");
    const currentYear = new Date().getFullYear();
    const currentMounth = new Date().getMonth();

    data.forEach(contestData => {
        const startDate = new Date(contestData.start_time); 
        
        const hours = String(startDate.getHours()).padStart(2, '0');
        const minutes = String(startDate.getMinutes()).padStart(2, '0');
        const day = String(startDate.getDate()).padStart(2, '0');
        const month = String(startDate.getMonth() + 1).padStart(2, '0');
        const year = startDate.getFullYear();

        const dayMonth = startDate.toLocaleString('ru-RU', { day: 'numeric', month: 'long' }); 

        const card = document.createElement("article");
        card.className = "home-card";

        const timeDisplay = (year === currentYear) 
            ? (currentMounth === month)
                ?`${hours}:${minutes}` 
                :`${startDate.toLocaleString('ru-RU', { day: 'numeric', month: 'long' })} ${hours}:${minutes}`
            : `${day}.${startDate.toLocaleString('ru-RU', { day: 'numeric', month: 'long' })}.${year} ${hours}:${minutes}`;

        card.innerHTML = `
            <h2 class="home-card__title">${contestData?.title || "Без названия"}</h2>
            <div class="home-card__meta">
                <span class="home-tag">${contestData.is_team_based ? "Командный" : "Одиночный"}</span>
                <span>${timeDisplay} (MSK)</span>
            </div>
        `;

        newsContainer.prepend(card);
    });
}
