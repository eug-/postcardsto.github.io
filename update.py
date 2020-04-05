from json import dumps
from os import listdir
from os.path import isfile, join
from re import sub
from subprocess import call

OUTPUT = join('src','data.js')
INPUT_PATH = 'comix'
IMAGE_EXT = ('.png', '.jpg', '.jpeg', '.gif', '.svg')
INT_SORT = lambda x: int(sub(r'\D*', '', x))

data = []
issues = [f for f in listdir(INPUT_PATH) if not isfile(join(INPUT_PATH, f))]
# Sort using numbers, otherwise page '10' will show up before page '2'
issues.sort(key=INT_SORT)

for title in issues:
  path = join(INPUT_PATH, title)
  pages = []
  cover = None
  for f in listdir(path):
    if not isfile(join(path, f)) or not f.lower().endswith(IMAGE_EXT):
      continue
    image_path = '{0}/{1}/{2}'.format(INPUT_PATH, title, f)
    if 'cover' in f:
      cover = image_path
    else:
      pages.append(image_path)

  pages.sort(key=INT_SORT)
  data.append({'title': title, 'cover':cover, 'pages': pages})

with open(OUTPUT, 'w') as f:
  f.write('var COMIX_DATA = {0};'.format(dumps(data)))

call(['git', 'add', '.'])
call(['git', 'commit', '-am "Changes commited by update.py"'])
