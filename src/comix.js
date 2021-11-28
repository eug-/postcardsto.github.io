function createTitlePage(issues) {
  var container = document.createElement('div');
  container.className = 'title-page';

  container.appendChild(getBookLink());

  for (var issueIndex = issues.length - 1; issueIndex >= 0; issueIndex--) {
    var issue = issues[issueIndex];
    var img = document.createElement('img');
    img.src = issue.cover;
    img.title = issue.title;

    var link = document.createElement('a');
    link.className = 'issue';
    link.appendChild(img);
    link.href = '#' + issueIndex;

    container.appendChild(link);
  }

  return container;
}

function getBookLink() {
  var link = document.createElement('a');
  link.href = 'book.html';
  link.className = 'book-link';
  link.innerHTML = 'Dig it? Get <span class="book-name"><img src="src/book_icon.png"/> Covid Comix (the book)</span> here!';
  return link;
}

function createCell() {
  var back = document.createElement('a');
  back.id = 'back';
  back.className = 'back-arrow';

  var forward = document.createElement('a');
  forward.id = 'forward';
  forward.className = 'forward-arrow';

  var cell = document.createElement('img');
  cell.id = 'cell';
  cell.className = 'cell';

  var stretchy = document.createElement('div');
  stretchy.className = 'stretchy';

  var home = document.createElement('a');
  home.id = 'progress';
  home.className = 'home';

  var container = document.createElement('div');
  container.className = 'page';
  container.appendChild(back);
  container.appendChild(stretchy);
  container.appendChild(cell);
  container.appendChild(forward);
  container.appendChild(home);

  return container;
}

function drawCell(container, issues, issueIndex, pageIndex) {
  issueIndex = Number(issueIndex) || 0;
  pageIndex = Number(pageIndex) || 0;
  if (!issues[issueIndex]) {
    issueIndex = 0;
  }
  if (!issues[issueIndex].pages[pageIndex]) {
    pageIndex = 0;
  }

  var back = document.getElementById('back');
  var forward = document.getElementById('forward');
  var cell = document.getElementById('cell');
  var progress = document.getElementById('progress');
  var onLoad = function() {
    if (cell.classList) {
      cell.classList.toggle('wide', cell.width > cell.height);
    }
    cell.removeEventListener('load', onLoad);
  };
  cell.src = '';
  cell.src = issues[issueIndex].pages[pageIndex];
  cell.addEventListener('load', onLoad);

  var pages = issues[issueIndex].pages.length;
  var position = (100 * (pageIndex + .5) / pages);
  progress.style.backgroundPosition = 'left ' + position + '% center';

  if (!issues[issueIndex].pages[pageIndex - 1]) {
    back.href = '#';
  } else {
    back.href = '#' + issueIndex + ':' + (pageIndex - 1);
  }

  if (!issues[issueIndex].pages[pageIndex + 1]) {
    forward.href = '#';
  } else {
    forward.href = '#' + issueIndex + ':' + (pageIndex + 1);
  }
}
