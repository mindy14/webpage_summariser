from reduction import *
from scraper import write_to_file


def summarize():
	reduction = Reduction()
	text = open('filename.txt').read()
	reduction_ratio = 0.3
	summary = reduction.reduce(text, reduction_ratio)
	print(summary)



def main():
	write_to_file()
	summarize()


if __name__ == '__main__':
	main()
