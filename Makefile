# just make it ugly
ugly: fragment-min.js

fragment-min.js:
	uglifyjs \
		./fragment.js \
		./fragment_commons.js \
		-o fragment-min.js \
		-c -m -e

clean:
	rm fragment-min.js -f