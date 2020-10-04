from PIL import Image
import json
INPUT = 'src/data.js'

data = {}
with open(INPUT, 'r') as f:
  comix = f.read()[17:-1]
  data = json.loads(comix)

for comic in data:
  with Image.open(comic['cover']) as cover:
    original = cover.size
    if original[0] <= 500:
      continue

    resized = (500, int(500 * (1.0*original[1]/original[0])))
    print "resizing", comic["title"], original, resized
    sized_cover = cover.resize(resized)
    print sized_cover.size
    sized_cover.save(comic['cover'])
