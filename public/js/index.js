let existingStates = null;

async function getExistingStates() {
  try {
    const response = await fetch('/api/states');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      existingStates = await response.json();
    }
  } catch (error) {
    console.log('There was a problem with the fetch operation: ' + error.message);
  }
}

let stateData = null;

async function getStateData() {
  const url = 'https://freetestapi.com/api/v1/us-states';
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      stateData = await response.json();
      populateSelect(stateData);
    }
  } catch (error) {
    console.log('There was a problem with the fetch operation: ' + error.message);
  }
}

function populateSelect(data) {
  const select = document.createElement('select');
  select.className = 'state-select';
  select.name = 'name';
  const stateNameList = existingStates.map((state) => state.name);
  data.filter(state => !stateNameList.includes(state.name)).forEach(state => {
    const option = document.createElement('option');
    option.value = state.name;
    option.text = state.name;
    select.appendChild(option);
  });

  const form = document.querySelector('.add-state form');
  const loader = document.querySelector('#loader');
  form.removeChild(loader);
  form.insertBefore(select, form.childNodes[0]);
}

getExistingStates().then(getStateData).then(renderCurrentState);

function renderCurrentState() {
  const stateCardsInner = document.querySelector(".states-cards-inner");
  stateCardsInner.innerHTML = '';
  const stateCards = document.createElement('div');
  stateCards.className = 'states-cards';
  let visibility = localStorage.getItem('tableVisibility');
  existingStates.forEach(state => {
    const htmlCode = `
     <div class="state-card">
              <div class="info">
                <div class="main">
                  <h6>${state.name}</h6>
                  <button type="button">
                    <img src="./images/icon-edit.svg" alt="Edit" />
                  </button>
                  <button
                    class="delete-btn"
                    data-id="${state._id}"
                    onclick="handleDeleteState(this)"
                  >
                    <img src="./images/icon-delete.svg" alt="Delete card" />
                  </button>
                </div>
                <div class="stat">
                  <p>Zones</p>
                  <span>1</span>
                </div>
                <div class="progress-inner">
                  <div class="heading">
                    <h2>Leads</h2>
                    <p>0/0</p>
                  </div>
                  <div class="bar">
                    <div class="progress-bar">
                      <div class="progress"></div>
                    </div>
                    <span>NaN%</span>
                  </div>
                </div>
              </div>
              <table id="zones-detail" class="${visibility === 'hidden' ? 'hidden' : ''}">
                <thead>
                  <tr>
                    <th>Zone</th>
                    <th>Leads</th>
                    <th>Percent</th>
                    <th>ZIPs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>GAA</td>
                    <td>10/20</td>
                    <td>50%</td>
                    <td>${state.zip}</td>
                  </tr>
                  <tr>
                    <td>GAB</td>
                    <td>15/30</td>
                    <td>50%</td>
                    <td>${state.zip}</td>
                  </tr>
                  <tr>
                    <td>GAC</td>
                    <td>20/40</td>
                    <td>50%</td>
                    <td>${state.zip}</td>
                  </tr>
                  <tr>
                    <td>GAD</td>
                    <td>25/50</td>
                    <td>50%</td>
                    <td>${state.zip}</td>
                  </tr>
                  <tr>
                    <td>GAE</td>
                    <td>30/60</td>
                    <td>50%</td>
                    <td>${state.zip}</td>
                  </tr>
                </tbody>
              </table>
            </div>
   `;
    stateCards.innerHTML += htmlCode;
  });
  stateCardsInner.appendChild(stateCards);
}

function handleDeleteState(button) {
  const id = button.dataset.id;
  if (id) {
    fetch(`/${id}`, {
      method: 'DELETE',
    })
      .then(() => window.location.reload())
      .catch((error) => {
        console.error('Ошибка:', error);
      });
  }
}

function toggleDetails() {
  let tables = document.querySelectorAll('#zones-detail'); 
  tables.forEach(function (table) {
    table.classList.toggle('hidden');
    localStorage.setItem('tableVisibility', table.classList.contains('hidden') ? 'hidden' : 'visible');
  });
}


