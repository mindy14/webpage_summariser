import urllib
from bs4 import BeautifulSoup
import re
from Tkinter import Tk


def write_to_file():
	url= Tk().clipboard_get()

	html = urllib.urlopen(url).read()
	soup = BeautifulSoup(html, "html.parser")
	p=soup.find_all('p')
	p = str(p)
	cleanr = re.compile('<.*?>')
	cleantext = (re.sub(cleanr, '',p)).decode('unicode-escape').encode('ascii', 'ignore')


	f = open("/home/bandyopaddy/Downloads/text summarizer/filename.txt", "w");
	f.write(cleantext)