### Hexlet tests and linter status:
[![Actions Status](https://github.com/jessdrk/fullstack-javascript-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/jessdrk/fullstack-javascript-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/6754ad6f72addbb95932/maintainability)](https://codeclimate.com/github/jessdrk/fullstack-javascript-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6754ad6f72addbb95932/test_coverage)](https://codeclimate.com/github/jessdrk/fullstack-javascript-project-46/test_coverage)
![example workflow](https://github.com/jessdrk/fullstack-javascript-project-46/actions/workflows/nodejs.yml/badge.svg)

## Setup
```bash
git clone
make install
sudo npm link
```

### Описание утилиты / Description of the utility
```bash
gendiff -h
```
```bash
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format <type>  output format (default: "stylish")
  -h, --help           display help for command
```


### Вычислитель отличий / Difference calculator
###### Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Утилита имеет возможность поддерживать разные входные форматы: <u>yaml</u>, <u>json</u> и генерировать отчеты в виде <u>plain</u> text, <u>stylish</u> и <u>json</u>.
###### A difference calculator is a program that determines the difference between two data structures. The utility has the ability to support different input formats: <u>yaml</u>, <u>json</u> and generate reports in the form of <u>plain</u> text, <u>stylish</u> and <u>json</u>.

### Example difference calculator (json files)
```bash
gendiff file1.json file2.json
```
[![asciicast](https://asciinema.org/a/622019.svg)](https://asciinema.org/a/622019)

### Example difference calculator (yaml files and yml files)
```bash
gendiff file1.yaml file2.yaml
```
[![asciicast](https://asciinema.org/a/622750.svg)](https://asciinema.org/a/622750)

### Example difference calculator (format stylish)
```bash
gendiff file1.json file2.yaml
```
[![asciicast](https://asciinema.org/a/625154.svg)](https://asciinema.org/a/625154)

### Example difference calculator (format plain)
```bash
gendiff --format plain file1.json file2.json
```
[![asciicast](https://asciinema.org/a/624194.svg)](https://asciinema.org/a/624194)

### Example difference calculator (format json)
```bash
gendiff --format json file1.json file2.json
```
[![asciicast](https://asciinema.org/a/624232.svg)](https://asciinema.org/a/624232)