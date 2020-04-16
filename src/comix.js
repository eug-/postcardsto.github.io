function createTitlePage(issues) {
  var container = document.createElement('div');
  container.className = 'title-page';

  for (var issueIndex = issues.length - 1; issueIndex >= 0; issueIndex--) {
    var issue = issues[issueIndex];
    var img = document.createElement('img');
    img.src = issue.cover;
    img.title = issue.title;

    var link = document.createElement('a');
    link.className = 'issue';
    link.appendChild(img);
    link.appendChild(document.createElement('br'));
    link.href = '#' + issueIndex;

    container.appendChild(link);
  }

  return container;
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

  cell.src = issues[issueIndex].pages[pageIndex];

  var pages = issues[issueIndex].pages.length;
  var position = (100 * (pageIndex + .5) / pages);
  progress.style.backgroundPosition = 'left ' + position + '% center';

  if (!issues[issueIndex].pages[pageIndex - 1]) {
    var previousIssue = issueIndex - 1;
    if (previousIssue >= 0) {
      back.href = '#' + previousIssue + ':' + (issues[previousIssue].pages.length - 1);
    } else {
      back.href = '#';
    }
  } else {
    back.href = '#' + issueIndex + ':' + (pageIndex - 1);
  }

  if (!issues[issueIndex].pages[pageIndex + 1]) {
    var nextIssue = issueIndex + 1;
    forward.href = '#' + (nextIssue >= issues.length ? '' : nextIssue);
  } else {
    forward.href = '#' + issueIndex + ':' + (pageIndex + 1);
  }
}
