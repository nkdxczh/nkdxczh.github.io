from PIL import Image
import sys
from PIL import ImageDraw
from PIL import ImageFont
import imageio
import random

words = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
w = 0
h = 0
pos = []

def pic2pos(inputFile):
    im = Image.open(inputFile).convert('LA')
    pix = im.load()
    [w,h] = im.size
    result = ''
    for i in range(w):
        for j in range(h):
            if pix[i,j] != (255,255):
                pos.append([i,j])
    return [w,h]

def generate(outputFile):
    img = Image.new('RGBA', (w*10, h*10), (0, 0, 0, 0))
    font = ImageFont.truetype("arial.ttf", 12)
    draw = ImageDraw.Draw(img)
    for i in pos:
        draw.text((int(i[0]*10),int(i[1]*10)), words[int(random.random()*len(words))],(0,255,0), font=font)
    img.save(outputFile)

def generateGif(out, pics):
    images = []
    kargs = { 'duration': 0.1, 'loop': sys.maxint}
    for filename in pics:
        images.append(imageio.imread(filename))
    imageio.mimsave(out, images,'GIF-FI', **kargs)

names = ['welcome','resume','projects','demo']
for name in names:
    inputF = '../img/'+name+'.png'
    outputF = 'tmp/'+name
    pos = []
    [w,h] = pic2pos(inputF)
    pics = []
    for i in range(10):
        f = outputF + str(i) + '.png'
        generate(f)
        pics.append(f)
    generateGif('../img/'+name + '.gif', pics)
