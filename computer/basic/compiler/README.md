# Standford Compiler

## Lexical Analysis & Finite Automata

### Role

- place diveiders in the string to recognize the substrings

- Classify program substrings according to role(token class)

- Communicate tokens to the parser

### Existence

string => token class

#### Token Class

Token classes correspond to sets of string.

- In English
  noun, verb, adjective, ...

- In a programming language

  Identifier, Keywords, Numbers, '(', ')', ...

Indentifier:
  strings of letters or digits, starting with a letter
  
Numbers:
  a non-empty string of digits

Keyword:
  a fix set of reserved words, such as "else" or "if" or "begin"

Whitespce:
  a non-empty sequence of blanks, tabs and newlines

Punctuation:
  (, ), ;
### Procedure

string -> token

token: a sequence or pair of token class and substring

> see la2p.xml

### Regular languages

The lexical structure of a programming language is set of token classes.

Each one of the token classes consists of some set of strings.

We need a way to specify which set of strings belongs to each token class.

The usual tool is to use **regular languages**.

#### Regular expressions

To define Regular languages, we use something called regular expressions.

- Single character

'c' = {"c"}

- Epsilon

ε = {""}

- Union(并)

A + B = {a | a ∈ A} ∪ {b | b ∈ B}

- Concatenation(连接)

AB = {ab | a ∈ A ∩ b ∈ B}

- Iteration(迭代)

A* = ∪Ai(i>=0)

#### Alphabet

∑ = {1， 0}

1* = ∪1i(i>0) = "" + 1 + 11 ... = {a | a ∈ ""} ∪ {b | b ∈ 1} ∪...

(1 + 0) 1 = {ab | a ∈ 1+0 ∩ b ∈ 1}= {11, 10}