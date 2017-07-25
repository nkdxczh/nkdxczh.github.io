from PIL import Image
from PIL import ImageDraw
from PIL import ImageFont
import random

words = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
pos = []
w = 0
h = 0

def pic2pos(inputFile):
    im = Image.open(inputFile).convert('LA')
    pix = im.load()
    [w,h] = im.size
    result = ''
    for i in range(w):
        for j in range(h):
            if pix[i,j] != (255,255):
                pos.append([i,j])

def generate(outputFile):
    img = Image.new('RGBA', (w*10, h*10), (255, 0, 0, 0))
    font = ImageFont.truetype("arial.ttf", 10)
    draw = ImageDraw.Draw(img)
    for i in pos:
        draw.text((10, 10), Math, font=font)
    img.save(outputFile, "GIF", transparency=0)
