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

### Formal languages

#### Definition

A formal language has an alphabet(a set of characters), and is just any set of strings over some alphabet

A language over alphabet is a set of strings of characters drawn from alphabet

e.g.

Alphabet = English characters

Language = English sentences

Alphabet = ASCII

Language = C Programs

#### Meaning Function

Meaning function L maps syntax to semantics

L(e) = M

L(ε) = {""}
e: regular expression
L: meaning function
M: set of strings

- Meaning is many to one

- Why use a meaning function?

Makes clear what is syntax, what is semantics

Allows us to consider notation as s separate issue

Because expressions and meanings are not 1-1, so there are many syntaxs representing the same meaning which can be used to optimization code

syntax   semantics

a    ->      A

b    ↗       B

c    ↗

### Lexical Specifications

#### Target

- how to use regular expressions to specify different aspects of programming languages

- how regular expression are used to contruct a full lexical specification on the programming language


#### Keywords

'i''f' + 'e''l''s''e' + 't''h''e''n' = 'if' + 'else' + 'then'

#### Intger: a non-empty string of digits

digit = '0' + '1' + '2' + '3' + '4' + '5' + '6' + '7' + '8' + '9'

digits = digit+

opt_fraction = ('.'digits) + ε

opt_exponent = ('E'('+' + '-' + ε)digits) + ε

num = digits opt_fraction opt_exponent

#### Identifier: strings of letters or digits, starting with a letter

letter = 'a' + 'b' + 'c' + ... + 'Z' = [a-zA-Z]

identifier = letter(letter+digit)*

#### Whitespace: a non-empty sequence of blanks, newlines and tabs

whitespace = (' ' + '\n' + '\t')

#### Notation in regular expression

At least one: A+ = AA*

Union: A | B = A + B

Option: A? = A + ε

Range: 'a' + 'b' + ... + 'z' = [a-z]

Excluded range:
[^a-z]

#### Define a lexical specification of the language

1. Write a regp for the lexemes of each token class

Number = digit+

keyword = 'if' + 'else' + ...

identifier = letter(letter + digit)*

OpenPar = '(' + ')' + ...

...

2. Construct R, matching all lexemes for all tokens to form the lexical specification of the language

R = Keyword + Identifier + Number + ...

  = R1 + R2 + ...

3. Let input be x1x2...xn

For 1 <= i <= n check
  x1...xi ∈ L(R)

4. If success, then we know that
  x1...xi ∈ L(Rj) for some j

5. Remove x1...xi from input and go to (3)

[note]

- How much input is used ?

such as == and =

based on 'Maximal Munch', we should use the longer one

- Which token(rexp) is used if more than one token matches

e.g.

x1...xi ∈ L(R)

x1...xi ∈ L(Rj)

x1...xi ∈ L(Rk)

if ∈ L(Keywords)
  ∈ L(Identifier)

to resolve is by a priority ordering

- What if no rule matches

Print error message...


#### Summary

- Regular languages are a language spcification

We still need an implementation

- Regular expressions describe many useful languages

- Regular expressions are a concise notation for string patterns

- Use in lexical analysi requires small extensions

to resolve ambiguities, match as long as possible and choose the highest priority match

to handle errors, catch all regular experssion that soaks up all possible erroneous strings and give it the lowest priority so that it only triggers if no valid token class matches

- Good algorithms know

Require only single pass over the input

Few operations per character(table lookup)

#### Finite Automata

Finite Automata is a good implementation model for regular expressions.

Regular expressions = specification

Finite automata = implementation

- A finite automaton consists of

An input alphabet ∑

A finite set of states S

A start state n

A set of accepting states F 包含于 S (final state)

A set of transitions state -> (input) state

---

- Transition

S1 -> a S2

In state S1 on input a go to state S2

If end of input and in accepting state => accept (final state)

Otherwise => reject(reject the input) it means that these inputs is not in the language of a finite automaton

reject situations contains terminates in state S ∉ F or gets stuck

**see finite_automata.xml**

**Language of a finite automata equals to the set of accepting state?**

A finite automaton accepting any number of 1's followed by a single 0

Alphabet: {0, 1}

https://lagunita.stanford.edu/courses/Engineering/Compilers/Fall2014/courseware/708cb92d25c24fbdad592929b4a80917/a0f88c7d79d24df0959723d58f119a6c/?child=first

---

A finite automaton consumes a character of input everytime it makes a move

- Another kind of transition: ε-moves

the idea behind the epsilon move is that the machine can make a state transition without consuming input

- Deterministic finite automata（DFA)

One transition per input per state(one input to one state)

No ε-moves

A DFA takes only one path through the state graph with per input

A NFA can choose: accepts if some choices lead to accepting state

- NFAs and DFAs

NFAs and DFAs recognize the same set of languages(regular languages)

DFAs are faster to execute as there are no choices to consider

DFAs are in general smaller, but slower to exeute