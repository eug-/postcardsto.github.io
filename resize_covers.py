from PIL import Image
import json
INPUT = 'src/data.js'

def resize(name, size):
  with Image.open(name) as cover:
    original = cover.size
    if original[0] <= size + 1:
      return

    resized = (size, int(size * (1.0*original[1]/original[0])))
    print "resizing", comic["title"], name, original, resized
    sized_cover = cover.resize(resized, Image.LANCZOS)
    sized_cover.save(name)

data = {}
with open(INPUT, 'r') as f:
  comix = f.read()[17:-1]
  data = json.loads(comix)

for comic in data:
  resize(comic['cover'], 500)
  for page in comic['pages']:
    resize(page, 1400)
