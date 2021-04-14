# Introducción a Webpack

## ¿Qué es Webpack?

Es una herramienta que nos permite preparar nuestro código para enviarlo a producción. Nos permite trabajar con JS, CSS, Archivos Estáticos, Imagenes, Fuentes.

Webpack es un module bundler. Webpack también permite habilitar un modo de desarrollo.

Webpack nace en 2012 y muchas empresas lo han adoptado desde entonces. Y lo utilizan como core de sus proyectos (Twitter, Instagram). Podremos gestionar dependencias, ejecutar tareas, conversión de formas (Archivos de imagen, css),Habilitar un entorno de desarrollo local para hacer pruebas en mi equipo, cargar módulos de javascript.

Webpack nos permite trabajar de forma módular, dividiendo nuestro proyecto en diferentes módulos y luego unirlos en uno mismo. Preparandolos, optimizandolos, minificandolos para enviarlo a producción.

## Conceptos básicos

Definamos a Webpack como un conjunto de módulos estáticos para aplicaciones de JavaScript modernas. Webpack construye un gráfico de dependencias que mapea cada módulo para convertirlo en uno o más módulos según sea el caso.

Debemos de tener un punto de entrada dentro de una carpeta especifica y un index.js. También necesitamos un punto de salida (Normalmente la carpeta dist).

Vamos a contar con varios modos, modo producción, modo desarrollo y una opción para poder observar los cambios en tiempo real.

Webpack dispone de loaders para entender un lenguaje particular y pluggins para añadir configuraciones.

También podemos tener modos de performance para configurar como se va a minificar nuestro proyecto, hacia donde lo vamos a enviar (el destino de los elementos), habilitar un modo de desarrollo local.

# Proyecto Inicial

## Tu primer build con Webpack

> mkdir curso-webpack
>
> cd curso-webpack
>
> git init
>
> npm init -y
>
> npm install webpack webpack-cli --save-dev
>
> npx webpack
>
> npx webpack --mode development
>
> npx webpack --mode production

## Instalación de Webpack y construcción del proyecto

> git clone https://github.com/gndx/js-portfolio.git
>
> cd js-portfolio
>
> code .

Organización:

- js-porfolio/
  - public/
  - src/
    - assets/
      - fonts/
      - images/
    - styles/
      - main.css
    - templates/
      - Template.js
    - utils/
      - getData.js
    - index.js
  - .gitignore
  - LICENSE
  - package.json
  - README.md

> npm install webpack webpack-cli --save-dev
>
> npx webpack --mode production

## Configuración de webpack.config.js

Creamos el archivo webpack.config.js con el siguiente contenido:

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".js"],
  },
};
```

Tenemos que indicar el entry point, que es el archivo en el que inicia nuestra aplicación...

También debemos indicar el output que sería la carpeta en la que va a dejar el archivo procesado, así como su nombre. Utilizamos path porque así cuando utilizamos CICD no va a dar problemas.

Y además debemos indicar las extensiones de los archivos que webpack debe buscar.

> npmx webpack --mode production --config webpack.config.js

Además vamos a agregar un script al archivo package.json

```javascript
"build": "webpack --mode production"
```

Con este comando no es necesario establecer el archivo de configuración porque al estar así webpack lo lee del directorio en que esta el package.json.

# Loaders y Plugins en Webpack

## Babel Loader para JavaScript

Babel para compilar nuestro código javascript y hacerlo compatible con todos los navegadores.

Instalamos unas dependencias

> npm install --save-dev babel-loader @babel/core @babel/preset-env @babel/plugin-transform-runtime

Creamos un archivo llamado: .babelrc

```
{
    "presets": [
        "@babel/preset-env"
    ],
    "plugins": [
        "@babel/plugin-transform-runtime"
    ]
}
```

Y en el webpack.config.js

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
};
```

> npm run build

Segun la documentación de babel loader tambien podría hacer...

```javascript
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
};
```

## HTML en Webpack

Instalamos el html-webpack-plugin

> npm install --save-dev html-webpack-plugin

Y en el archivo de webpack.config.js

```javascript
const path = require("path");
//Agregamos esta linea
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
  // Agregamos la sección de plugins
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
};
```

Cambiamos el archivo index... borrando la linea

```html
<script type="module" src="../src/index.js"></script>
```

> npm run build

Webpack crea en dist el index.html minificado y el main.js minificado.

Podemos modificar los scripts en package.json

```javascript
"dev": "webpack --mode development"
```

> npm run dev

## Loaders para CSS y preprocesadores de CSS

Primero debemos instalar las dependencias que vamos a trabajar:

css-loader es el loader.

mini-css-extract-plugin es para poder trabajar con css dividido en nuestra aplicación y unirlo.

> npm install --save-dev mini-css-extract-plugin css-loader

Cambiamos la estructura del proyecto... del template index.html debemos eliminar el css

Y luego dentro de src/ cambiamos el archivo index.js

```javascript
import Template from "./templates/Template.js";
import "./styles/main.css";

(async function App() {
  const main = null || document.getElementById("main");
  main.innerHTML = await Template();
})();
```

Y vamos al archivo de webpack.config.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
//Agregamos esto
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
        // Agregamos una nueva regla
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    // Agregamos un nuevo plugin
    new MiniCssExtractPlugin(),
  ],
};
```

> npm run dev

Para trabajar con un preprocesador... digamos stylus

> npm install --save-dev stylus stylus-loader

Y el cambio en la regla sería:

```javascript
{
  test: /\.css|.styl$/i,
  use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'],
}
```

Podemos crear un archivo styles/vars.styl

```
$color-black = red

body
  color $color-black
```

Y en el index.js

```javascript
import "./styles/vars.styl";
```

> npm run dev

Para trabajar con sass

> npm install --save-dev node-sass sass-loader

```javascript
{
  test: /\.s?css$/,
  use: [MiniCssExtractPlugin.loader,
  "css-loader",
  "sass-loader"]
},
```

## Copia de archivos con Webpack

Para mover archivos de src a la carpeta de distribution. Necesitamos instalar algunas dependencias:

> npm install --save-dev copy-webpack-plugin

Vamos a mover fuentes e imagenes...

Entonces modificamos el webpack.config.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Agregamos esto
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin(),
    // Agregamos esto
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, "src", "assets/images"),
        to: "assets/images"
      }]
    })
  ],
};
```

Y en el archivo Template.js cambiamos los img para quitarle el .src y que utilice las imagenes de assets/images

> npm run dev

## Loaders de imágenes

Ahora una forma de copiar las imagenes haciendo un import de las mismas y generando una variable.

Ahora no instalamos dependencias, sino que vamos a utilizar asset-loader que nos provee webpack. Entonces modificamos el webpack.config.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        // Agregamos esto:
        {
          test: /\.png/,
          type: "asset/resource",
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, "src", "assets/images"),
        to: "assets/images"
      }]
    })
  ],
};
```

Ahora ya podemos utilizar esta configuración importando la imagen al Template.js

```javascript
import github from '../assets/images/github.png';

// Y modificamos el src de las img
const imagen = `<img src="${github}" />`

// O en React sería algo así

<img src={github} />
```

Y corremos:

> npm run dev

## Loaders de fuentes

Las fuentes en formato woff están optimizadas para la web...

En este link se pueden descargar en este formato:

http://google-webfonts-helper.herokuapp.com/fonts/ubuntu?subsets=cyrillic,latin

Cambiamos el main.css del proyecto:

```css
/* Borramos este import
@import "https://fonts.googleapis.com/css?family=Ubuntu:300,400,500";
*/

@font-face {
  font-family: "Ubuntu";
  src: url("../assets/fonts/ubuntu-regular.woff2") format("woff2"), url("../assets/fonts/ubuntu-regular.woff")
      format("woff");
  font-weigth: 400;
  font-style: normal;
}
```

Debemos instalar estas dependencias...

> npm install --save-dev url-loader file-loader

Y modificar el webpack.config.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    // Agregamos esto pero por las imagenes
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.png/,
          type: "asset/resource",
        },
        // Agregamos esto
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "[name].[ext]",
              outputPath: "./assets/fonts/",
              publicPath: "./assets/fonts/",
              esModule: false,
            }
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin(),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, "src", "assets/images"),
        to: "assets/images"
      }]
    })
  ],
};
```

## Optimización: hashes, compresión y minificación de archivos

Una de las razones importantes por la cual utilizamos Webpack es la optimización de nuestro proyecto. Comprimir nuestro css, html, js, optimizar las imagenes, etc.

Vamos a instalar unas dependencias:

> npm install --save-dev css-minimizer-webpack-plugin terser-webpack-plugin

Podemos identificar cada build de nuestro proyecto con un hash...

Y ahora modificamos nuevamente el webpack.config.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// Agregamos esto
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    /* Esto es lo del hash
    filename: "main.js",*/
    filename: "[name].[contenthash].js"
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  resolve: {
    extensions: [".js"],
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.png/,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              // Esto tambien es por lo del Hash
              // name: "[name].[ext]",
              name: "[name].[contenthash].[ext]",
              outputPath: "./assets/fonts/",
              publicPath: "./assets/fonts/",
              esModule: false,
            }
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    // Esto también es por lo del Hash
    // new MiniCssExtractPlugin(),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css"
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, "src", "assets/images"),
        to: "assets/images"
      }]
    })
  ],
  // Agregamos esto para optimizar recursos
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  }
};
```

> npm run dev
>
> npm run build

## Webpack Alias

Webpack Alias se puede utilizara para que cuando estemos importando archivos no tengamos que hacer rutas muy largas o subir muchas carpetas.

```javascript
import "../../../nombredelarchivo";
```

Para eso podemos ir al webpack.config.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js"
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  resolve: {
    extensions: [".js"],
    // Agregamos esto
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.png/,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "[name].[contenthash].[ext]",
              outputPath: "./assets/fonts/",
              // Este hay que cambiarlo...
              // publicPath: "./assets/fonts/",
              publicPath: "../assets/fonts/",
              esModule: false,
            }
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css"
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, "src", "assets/images"),
        to: "assets/images"
      }]
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  }
};
```

Entonces ya en nuestro index.js podemos cambiar los import

```javascript
import Template from "@templates/Template.js";
import "@styles/main.css";

...
```

Tambien en Template.js

```javascript
import getData from "@utils/getData.js";
import github from "@images/github.png";
import twitter from "@images/twitter.png";
import instagram from "@images/instagram.png";

...
```

# Deploy de entorno

## Variables de entorno

Conforme vayan creciendo nuestros proyectos tendremos la necesidad de trabajar con variables de entorno. Un lugar seguro para tener nuestras variables y no meterlas en el código.

Primero instalamos una dependencia...

> npm install --save-dev dotenv-webpack

Y luego creamos un archivo .env, en donde van a vivir las variables de entorno. El archivo .env no se sube al repositorio.

Es necesario agregar un archivo .env.example como un archivo con varibles de ejemplo que si se va a subir al repositorio y no son las variables reales.

En el .env colocamos:

```
API=http://randomuser.me/api/
```

Y en el .env.example:

```
API=
```

Luego en nuestro archivo webpack.config.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
// Agregamos esto
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js"
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.png/,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "[name].[contenthash].[ext]",
              outputPath: "./assets/fonts/",
              publicPath: "../assets/fonts/",
              esModule: false,
            }
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css"
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, "src", "assets/images"),
        to: "assets/images"
      }]
    }),
    // Agregamos un plugin
    new Dotenv(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  }
};
```

Y luego en el archivo de javascript de utils/getdata

```javascript
/* Antes estaba así
const API = "http://randomuser.me/api/";
*/
const API = process.env.API;
```

## Webpack en modo desarrollo

Podemos tener un modo desarrollo y un modo producción. Aquí podemos tener un archivo de configuración para desarrollo llamado webpack.config.dev.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
// Estlo lo puedo borrar del modo desarrollo porque no voy a optimizar css o imagenes.
//const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
//const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js"
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  // Le agrego esto para indicarle que este el el archivo de modo desarrollo
  mode: "development",
  resolve: {
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.png/,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "[name].[contenthash].[ext]",
              outputPath: "./assets/fonts/",
              publicPath: "../assets/fonts/",
              esModule: false,
            }
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css"
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, "src", "assets/images"),
        to: "assets/images"
      }]
    }),
    new Dotenv(),
  ],
  // En Desarrollo no necesito optimizar imagenes, lo puedo borrar...
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new CssMinimizerPlugin(),
  //     new TerserPlugin(),
  //   ]
  // }
};
```

Entonces en el script de package.json podemos cambiar el script

```javascript
"dev": "webpack --config webpack.config.dev.js",
```

## Webpack en modo producción

En modo producción debemos utilizar el webpack.config.js normal pero al modo producción queremos añadirle algo para limpiar nuestro proyecto porque esta generando nuevos por los hash.

Entonces instalamos esta dependencia:

> npm install --save-dev clean-webpack-plugin

Y entonces podemos trabajar en el webpack.config.js

````javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const Dotenv = require("dotenv-webpack");
// Importamos este plugin
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js"
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  resolve: {
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.png/,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "[name].[contenthash].[ext]",
              outputPath: "./assets/fonts/",
              publicPath: "../assets/fonts/",
              esModule: false,
            }
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css"
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, "src", "assets/images"),
        to: "assets/images"
      }]
    }),
    new Dotenv(),
    // Y aquí lo ejecutamos.
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  }
};

Y podemos modificar el script de build

```javascript
"build": "webpack --mode production --config webpack.config.js",
````

## Webpack Watch

El modo de escucha es para que compile automaticamente nuestro proyecto conforme se hacne cambio....

Al archivo de webpack.config.dev.js

```javascript
{
  ...
mode: "development",
watch: true,
...
}
```

Luego al correr

> npm run dev

Ya el webpack se queda observando los cambios.

Otra forma en que podemos activar el modo escucha es agregandolo a los scripts

```javascript
"build:watch": "webpack --watch --mode production --config webpack.config.js",
```

Y ahora podemos ejecutar:

> npm run build:watch

El modo producción se tarda más que el modo development, eso es necesario recordarlo.

## Deploy a Netlify

Netilfy permiet desplegar nuestros sitios de forma muy amigable. Podemos conectar nuestro repositorio (github, gitlab, bitbucket).

Creamos un archivo netlify.toml

```toml
[build]
  publish = "dist"
  command = "npm run build"
```

> git add .
>
> git commit -m "Curso de Webpack"

Para hacer commits con emogis

https://github.com/carloscuesta/gitmoji

https://github.com/carloscuesta/gitmoji-cli

> git push origin clase/18

Ahora desde netlify podemos conectar netlify al repositorio... puedo elegir que rama quiero publicar.

Elegimos el comando del build (npm run build)

Y le indicamos la carpeta (dist)

Corrigiendo errores:

> npm install --save-dev stylus

Y creamos una carpeta llamada scripts/create-env.js

```javascript
const fs = require("fs");

fs.writeFileSync("./.env", `API=${process.env.API}\n`);
```

Y en netlify podemos agregar en Build & Deploy las variables de entorno que va a tener:

Podemos crear una nueva variable llamada API con el valor de la url de la API.

Debemos ejecutar el script antes del build.

```javascript
"build": "node ./scripts/create-env.js && webpack --mode production --config webpack.config.js",
```

# Herramientas de desarrollo complementarias

## Webpack Dev Server

> npm install --save-dev webpack-dev-server

Debemos cambiar nuestro archivo webpack.config.dev.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js"
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  mode: "development",
  resolve: {
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.png/,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "[name].[contenthash].[ext]",
              outputPath: "./assets/fonts/",
              publicPath: "../assets/fonts/",
              esModule: false,
            }
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css"
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, "src", "assets/images"),
        to: "assets/images"
      }]
    }),
    new Dotenv(),
  ],
  // Agregamos esta configuración
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    port: 3005,
  }
};
```

Ahora podemos agregar un script

```javascript
"start": "webpack server --config webpack.config.dev.js"
```

## Webpack Bundle Analyzer

Instalamos una dependencia

> npm install --save-dev webpack-bundle-analyzer

Y nuevamente cambiamos el webpack.config.dev.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
// Importamos un plugin
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js"
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  mode: "development",
  resolve: {
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.png/,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "[name].[contenthash].[ext]",
              outputPath: "./assets/fonts/",
              publicPath: "../assets/fonts/",
              esModule: false,
            }
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css"
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, "src", "assets/images"),
        to: "assets/images"
      }]
    }),
    new Dotenv(),
    // Aquí agregamos en bundle analyzer
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    port: 3005,
  }
};
```

Y ahora se generarán reportes de como podemos optimizar nuestros recursos

> npx webpack --profile --json > stats.json
>
> npx webpack-bundle-analizer stats.json

## Webpack DevTools

Una particularidad para poder revisar nuestro código es el modo devtools para crear un mapa de nuestro código y con él poderlo leer a detalle y analizar cada una de las particularidades de lo que está compilando nuestro proyecto.

Debemos cambiar nuestro archivo de webpack.config.dev.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js"
    assetModuleFilename: "assets/images/[hash][ext][query]",
  },
  mode: "development",
  // Agregamos aquí una configuración
  devtool: "source-map",
  resolve: {
    extensions: [".js"],
    alias: {
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@templates": path.resolve(__dirname, "src/templates/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
      "@images": path.resolve(__dirname, "src/assets/images/"),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env"]],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.png/,
          type: "asset/resource",
        },
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "[name].[contenthash].[ext]",
              outputPath: "./assets/fonts/",
              publicPath: "../assets/fonts/",
              esModule: false,
            }
          }
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "assets/[name].[contenthash].css"
    }),
    new CopyPlugin({
      patterns: [{
        from: path.resolve(__dirname, "src", "assets/images"),
        to: "assets/images"
      }]
    }),
    new Dotenv(),
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: true,
    port: 3005,
  }
};
```

Ejecutamos:

> npm run dev

# Integración básica de React.js

## Instalación y Configuración de React

Ahora es hora de llevarlo al siguiente nivel con un proyecto de react...

> git clone https://github.com/platzi/curso-webpack-react.git
>
> cd curso-webpack-react
>
> code .
>
> npm init -y
>
> npm install --save react react-dom

Creamos los archivos:

- public/index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

- src/index.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

ReactDOM.render(<App />, document.getElementById("app"));
```

- src/components/App.jsx

```javascript
import React from "react";

const App = () => <h1>Hello React!</h1>;

export default App;
```

## Configuración de Webpack 5 para React.js

> npm install --save-dev @babel/core @babel/preset-env @babel/preset-react babel-loader

Creamos un archivo .babelrc

```
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```

> npm install --save-dev webpack webpack-cli webpack-dev-server

## Configuración de plugins y loaders para React

> npm install --save-dev html-loader html-webpack-plugin

Creamos el archivo webpack.config.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3006,
  },
};
```

Creamos unos scripts

```javascript
"start": "webpack serve --mode development",
"build": "webpack --mode production",
```

> npm run start
>
> npm run build

## Configuración de Webpack para CSS en React

> npm install --save-dev mini-css-extract-plugin css-loader style-loader sass sass-loader

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// Importamos plugin
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      // Una nueva regla
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    // Y aquí tambien agregamos el plugin
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3006,
  },
};
```

Entonces ya podemos crear:

src/styles/global.scss

```css
$base-color: #c6538c;
$color: rgba(black, 0.88);

body {
  background-color: $base-color;
  color: $color;
}
```

Importamos los estilos al index.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./styles/global.scss";

ReactDOM.render(<App />, document.getElementById("app"));
```

> npm run start

## Optimización de Webpack para React

Instalamos unas dependencias

> npm install --save-dev css-minimizer-webpack-plugin terser-webpack-plugin clean-webpack-plugin

Creamos el archivo webpack.dev.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  // Le agregamos el modo
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 3006,
  },
};
```

Y en el webpack.config.js

```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// Aquí agregamos los plugins para minificar
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugins = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    // Creamos un public path
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
    // Creamos alias
    alias: {
      "@components": path.resolve(__dirname, "src/components/"),
      "@styles": path.resolve(__dirname, "src/styles/"),
    },
  },
  // Agregamos el modo
  mode: "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    //Agregamos plugins
    new CleanWebpackPlugin(),
  ],
  // Borramos el dev server
  // Agregamos lo de optimization
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
```

Y agregamos un script a package.json

```javascript
"start": "webpack server --config webpack.config.dev.js",
"build": "webpack --config webpack.config.js",
```

## Deploy del proyecto con React.js

También podemos nuevamente autorizar netlify para entrar a un repositorio e indicarle que repositorio e indicarle que rama vamos a publicar...

El comando (npm run build)

Y el output (dist/)

# Próximos pasos

## Continúa con el Curso Práctico de Webpack
