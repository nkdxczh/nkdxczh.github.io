from PIL import Image

out = open('out','w')
im = Image.open("../img/demo.png").convert('LA')
pix = im.load()
[w,h] = im.size
result = ''
for i in range(w):
    for j in range(h):
        if pix[i,j] != (255,255):
            #result += '['+str(float(j)/h)+','+str(float(i)/w)+','+str(float(pix[i,j][0])/255)+'],'
            result += '['+str(float(j)/h)+','+str(float(i)/w)+'],'
out.write('['+result[:-1]+']')
out.close()
