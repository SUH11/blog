# 编译原理

[翻译地址](https://github.com/YongzeYao/the-super-tiny-compiler-CN)

[原文地址](https://github.com/jamiebuilds/the-super-tiny-compiler)



一般编译器的三个阶段：解析、转换、代码生成





1. ### 解析

   1. **词法分析：词素生成器**

      - 通过一个叫做**tokenizer**（词素生成器，也叫lexer）的工具将源代码分解成一个个词素。
      - **词素**是描述编程语言语法的对象。它可以描述数字，标识符，标点符号，运算符等等。
      - 例子方法：`tokenizer() {}`

      ```lisp
       (add 2 (subtract 4 2))
      /*
       *   词素生成：
       *   [
       *     { type: 'paren',  value: '('        },
       *     { type: 'name',   value: 'add'      },
       *     { type: 'number', value: '2'        },
       *     { type: 'paren',  value: '('        },
       *     { type: 'name',   value: 'subtract' },
       *     { type: 'number', value: '4'        },
       *     { type: 'number', value: '2'        },
       *     { type: 'paren',  value: ')'        },
       *     { type: 'paren',  value: ')'        },
       *   ]
      */
      ```

      

   2. **语法分析：抽象语法树**

      -  接收词素并将它们组合成一个描述了源代码各部分之间关系的中间表达形式：抽象语法树。
      - 抽象语法树是一个深度嵌套的**对象**
      - 例子方法：`parser() {}`

      ```
       (add 2 (subtract 4 2))
      /*
       *   抽象语法树生成（由上面的词素转化而来）：
       *   {
       *     type: 'Program',
       *     body: [{
       *       type: 'CallExpression',
       *       name: 'add',
       *       params: [{
       *         type: 'NumberLiteral',
       *         value: '2',
       *       }, {
       *         type: 'CallExpression',
       *         name: 'subtract',
       *         params: [{
       *           type: 'NumberLiteral',
       *           value: '4',
       *         }, {
       *           type: 'NumberLiteral',
       *           value: '2',
       *         }]
       *       }]
       *     }]
       *   }
      */
      ```

      

2. ### 转换

   接收解析生成的**抽象语法树**并对它**做出改动**。

   - 可以改变抽象语法树使代码保持在同一个语言
   - 或者编译成另外一门语言
   - 在转换抽象语法树的时候，我们可以通过添加/删除/替换节点属性来操纵节点。我们也可以添加节点，删除节点，或者基于现有的抽象语法树**创建一个全新的抽象语法树**。
   - 例子方法：`transformer() {}`、`traverser() {}`



​		转换的过程可能会涉及**遍历**（DFS）、设置**访问者**等等。

​		

3. ### 代码生成

   基于转换步骤产生的抽象语法树生成目标代码。

   一些编译器会重新利用更早阶段产生的词素，还有一些编译器会创建一个独立的代码表达形式从而能够线性地打印节点。

   - 例子方法：`codeGenerator() {}`



例子入口：`compiler(input) { ... }`





### code

```javascript
// 1. 词法分析
function tokenizer(input) {
  let current = 0
  let tokens = []

  while (current < input.length) {
    let char = input[current]
    
    if (char === '(') {
      tokens.push({
        type: 'paren',
        value: '('
      })
      current++
      continue
    }

    if (char === ')') {
      tokens.push({
        type: 'paren',
        value: ')'
      })
      current++
      continue
    }

    const WHITESPACE = /\s/
    if (WHITESPACE.test(char)) {
      current++
      continue
    }

    const NUMBERS = /[0-9]/
    if (NUMBERS.test(char)) {
      let value = ''
      while (NUMBERS.test(char)) {
        value += char
        char = input[++current]
      }
      tokens.push({
        type: 'number',
        value
      })
      continue
    }

    if (char === '"') {
      let value = ''
      char = input[++current]
      while (char !== '"') {
        value += char
        char = input[++current]
      }
      char = input[++current]
      tokens.push({
        type: 'string',
        value
      })
      continue
    }

    const LETTERS = /[a-z]/i
    if (LETTERS.test(char)) {
      let value = ''
      while (LETTERS.test(char)) {
        value += char
        char = input[++current]
      }
      tokens.push({
        type: 'name',
        value
      })
      continue
    }

    throw new TypeError(' I dont know whate this character is: ' + char)
  }
  return tokens
}
// 2. 语法分析
function parser(tokens) {
  let current = 0

  function walk() {
    let token = tokens[current]
    if (token.type === 'number') {
      current++
      return {
        type: 'NumberLiteral',
        value: token.value
      }
    }

    if (token.type === 'string') {
      current++
      return {
        type: 'StringLiteral',
        value: token.value
      }
    }

    if (token.type === 'paren' && token.value === '(') {
      token = tokens[++current]
      let node = {
        type: 'CallExpression',
        name: token.value,
        params: []
      }

      token = tokens[++current]
      while (token.type !== 'paren' ||
        (token.type === 'paren' && token.value !== ')')
      ) {
        node.params.push(walk())
        token = tokens[current]
      }

      current++
      return node
    }
    throw new TypeError(token.type)
  }
  let ast = {
    type: 'Program',
    body: []
  }
  while (current < tokens.length) {
    ast.body.push(walk())
  }
  return ast
}

function traverser(ast, visitor) {
  function traverseArray(array, parent) {
    array.forEach(child => {
      traverseNode(child, parent)
    })
  }
  
  function traverseNode(node, parent) {
    let methods = visitor[node.type]

    if (methods && methods.enter) {
      methods.enter(node, parent)
    }

    switch (node.type) {
      case 'Program':
        traverseArray(node.body, node)
        break
      case 'CallExpression':
        traverseArray(node.params, node)
        break
      case 'NumberLiteral':
      case 'StringLiteral':
        break
      default:
        throw new TypeError(node.type)
    }

    if (methods && methods.exit) {
      methods.exit(node, parent)
    }
  }
  traverseNode(ast, null)
}
// 3. new AST
function transformer(ast) {
  let newAst = {
    type: 'Program',
    body: []
  }

  ast._context = newAst.body
  traverser(ast, {
    NumberLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'NumberLiteral',
          value: node.value
        })
      }
    },

    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: 'StringLiteral',
          value: node.value
        })
      }
    },

    CallExpression: {
      enter(node, parent) {
        let expression = {
          type: 'CallExpression',
          callee: {
            type: 'Identifier',
            name: node.name
          },
          arguments: []
        }

        node._context = expression.arguments
        if (parent.type !== 'CallExpression') {
          expression = {
            type: 'ExpressionStatement',
            expression: expression
          }
        }

        parent._context.push(expression)
      }
    }
  })
  return newAst
}
// 4. 代码生成
function codeGenerator(node) {
  switch (node.type) {
    case 'Program':
      return node.body.map(codeGenerator).join('\n')
    case 'ExpressionStatement':
      return (
        codeGenerator(node.expression) + ';'
      )
    case 'CallExpression':
      return (
        codeGenerator(node.callee) + 
        '(' + 
        node.arguments.map(codeGenerator).join(', ') +
        ')'
      )
    case 'Identifier':
      return node.name
    case 'NumberLiteral':
      return node.value
    case 'StringLiteral':
      return '"' + node.value + '"'
    default: 
      throw new TypeError(node.type)
  }
}

function compiler(input) {
  let tokens = tokenizer(input)
  let ast = parser(tokens)
  let newAst = transformer(ast)
  let output = codeGenerator(newAst)
  return output
}
let input = '(add 2 (subtract 4 2))'
console.log('compiler', compiler(input))

/**
 * 解析
 *  1. 词法分析：词素生成器
 *  2. 语法分析：抽象语法树
 * 
 * 转换
 *  接收解析生产的抽象语法树，并对它作出改动
 * 
 * 遍历
 *  DFS遍历每一个节点
 * 
 * 访问者
 *  创建一个“访问者”对象，这个对象有不同的方法来接受不同节点类型
 * 
 * 代码生成
 *  基于抽象语法树，生成目标代码
 * 
 * 
 *                  LISP                      C
 *
 *   2 + 2          (add 2 2)                 add(2, 2)
 *   4 - 2          (subtract 4 2)            subtract(4, 2)
 *   2 + (4 - 2)    (add 2 (subtract 4 2))    add(2, subtract(4, 2))
*/
```

























































