const newBtn = document.querySelector('.new');
const bestBtn = document.querySelector('.best');

const API_KEY = 'GHL4EyAD%2B1JXd4bO0mbvcE28GOOhWZmfhkdcqWe63mC02FDwcKPaePr38d5RZyGhW8yO6AE4gcW5F2lyAJ06jA%3D%3D';

// pagination
let newsList = [];
let totalResults = 0;
let pageSize = 6;
let pageNo = 1;
let groupSize = 10;

const moveToPage = async (pageNum) => {
  const url = new URL(
    `https://apis.data.go.kr/6270000/dgsmartlib/newBookList?serviceKey=${API_KEY}&pageNo=${pageNo}&numOfRows=${numOfRows}&code=${librariesCode}&shelf_change_start_date=2023-01-01&shelf_change_end_date=2023-12-31`
  );
  await fetchData(url);
};

const pagination = () => {
  const pgcon = document.querySelector('.pgcon');
  let paginationHtml = `<button class="prev" ${pageGroup == 1 ? 'disabled' : ''} onclick="moveToPage(${currntPage - 1},  '${category}')"><i class="fa-solid fa-arrow-left"></i></button>`;
  pgcon.innerHTML = paginationHtml;
};

// ------ 검색창 만들기 ------
let librariesCode = 'AA51';
let numOfRows = 8;

const libraries = [
  { code: 'AA51', name: '대구2·28기념학생도서관' },
  { code: 'AB35', name: '대구광역시립두류도서관' },
  { code: 'AD39', name: '국채보상운동기념도서관 (중앙로)' },
  { code: 'AD40', name: '국채보상운동기념도서관 (두류역)' },
  { code: 'AG40', name: '대구광역시립남부도서관(안지랑역)' },
  { code: 'AH17', name: '대구광역시립동부도서관(파티마병원)' },
  { code: 'BA08', name: '북구 구수산도서관(매천시장)' },
  { code: 'BA22', name: '북구 구수산도서관(북구청소년회관)' },
  { code: 'BA23', name: '북구 구수산도서관(대구역)' },
  { code: 'BD10', name: '수성구립 범어도서관' },
  { code: 'BE18', name: '수성구립 용학도서관' },
  { code: 'BN13', name: '서구 원고개도서관' },
  { code: 'BR08', name: '달성군립도서관' },
  { code: 'BT10', name: '이천어울림도서관' },
  { code: 'CA08', name: '동구 안심도서관' },
  { code: 'CB08', name: '동구 신천도서관(동대구역)' },
  { code: 'CB10', name: '동구 신천도서관(동구청)' },
  { code: 'FG07', name: '수성구립 사월역작은도서관' },
  { code: 'FS02', name: '대구중구영어도서관' },
];

const select = document.querySelector('.smart_library');

libraries.forEach((library, index) => {
  const option = document.createElement('option');
  option.value = library.code;
  option.text = library.name;

  if (index === 0) {
    option.selected = true;
  }
  select.appendChild(option);
});

select.addEventListener('change', (e) => {
  librariesCode = e.target.value;
});

const searchBtn = document.querySelector('.searchBtn');
const searchInput = document.querySelector('.searchInput');

async function searchFn() {
  const searchValue = searchInput.value;
  const searchUrl = new URL(`https://apis.data.go.kr/6270000/dgsmartlib/bookSearch?serviceKey=${API_KEY}&pageNo=1&numOfRows=${numOfRows}&code=${librariesCode}&search_text=${searchValue}`);
  const searchList = await fetchData(searchUrl);
  render(searchList, createHtml);
  searchInput.value = '';
}

searchBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  searchFn();
});
searchInput.addEventListener('keypress', async (e) => {
  if (e.key !== 'Enter') return;
  searchFn();
});

const fetchData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data.response.body.items.item;
};
// ------ 검색창 끝 ------

const createHtml = (book) => {
  let image =
    book.hasOwnProperty('IMAGE') && book.IMAGE !== 'http://static.naver.net/book/image/noimg3.gif' ? book.IMAGE : 'https://m.okbible.com/data/skin/mobile_ver2_default/images/common/noimage.gif';

  return `
    <li onclick='bookModal("${encodeURIComponent(JSON.stringify(book))}")'>
      <div class="bookImg">
        <img src="${image}" alt="${book.TITLE || book.TITLE_INFO}" />
      </div>
      <p>${book.TITLE || book.TITLE_INFO}</p>
    </li>
  `;
};

const getNew = async () => {
  const newUrl = new URL(
    `https://apis.data.go.kr/6270000/dgsmartlib/newBookList?serviceKey=${API_KEY}&pageNo=1&numOfRows=${numOfRows}&code=${librariesCode}&shelf_change_start_date=2023-01-01&shelf_change_end_date=2023-12-31`
  );
  const newList = await fetchData(newUrl);
  render(newList);
};
const getBest = async () => {
  const bestUrl = new URL(
    `https://apis.data.go.kr/6270000/dgsmartlib/bestBookList?serviceKey=${API_KEY}&pageNo=1&numOfRows=${numOfRows}&code=${librariesCode}&search_start_date=2024-03-01&search_end_date=2024-03-31`
  );
  const bestList = await fetchData(bestUrl);
  render(bestList);
};

const render = (list) => {
  const bookList = document.querySelector('.bookList');
  if (list.length == 0) {
    bookList.innerHTML = `<li class='nolist'>검색결과가 없습니다.</li>`;
    return;
  }
  const html = list.map((book) => createHtml(book)).join('');
  bookList.innerHTML = html;
};

newBtn.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  getNew();
});

bestBtn.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') return;
  getBest();
});

getNew();

// 모달창 기능
const createModal = (book) => {
  let image =
    book.hasOwnProperty('IMAGE') && book.IMAGE !== 'http://static.naver.net/book/image/noimg3.gif' ? book.IMAGE : 'https://m.okbible.com/data/skin/mobile_ver2_default/images/common/noimage.gif';

  let contact = book.NON_CONTACT_YN === 'O' ? '대출 가능' : '대출중';
  return `
  <div class="bookCon">
    <div class="bookInfo">
      <img src="${image}" alt="${book.TITLE || book.TITLE_INFO}" />
      <div class="bookData">
        <h3>${book.TITLE || book.TITLE_INFO}</h3>
        <p>${book.AUTHOR} | ${book.PUBLISHER} | ${book.PUBLISH_YEAR || book.PUB_YEAR}</p>
        <p><strong>대출상태</strong> : ${contact}</p>
        <p><strong>I S B N</strong> : ${book.ISBN}</p>
        <p><strong>청구기호</strong> : ${book.CALL_NO}</p>
        <p><strong>소장기관</strong> : ${book.LIB_NAME}</p>
      </div>
      <button class="closeBtn" onclick="closeModal()"><i class="fa-solid fa-xmark"></i></button>
    </div>
  </div>
  `;
};

const modal = document.querySelector('.modal');

function bookModal(bookString) {
  const book = JSON.parse(decodeURIComponent(bookString));
  console.log('bookModal', book);

  modal.classList.remove('hidden');

  modal.innerHTML = createModal(book);
}

function closeModal() {
  modal.classList.add('hidden');
}

// 햄버거 버튼
const ham = document.querySelector('.ham');
ham.addEventListener('click', toggleMenu);

function toggleMenu() {
  const header = document.querySelector('header');
  const link = document.querySelector('header > a');
  const info = document.querySelector('.info');
  const body = document.body;

  ham.classList.toggle('on');
  header.classList.toggle('on');
  link.classList.toggle('on');
  info.classList.toggle('on');
  body.classList.toggle('scrollLock');
}
