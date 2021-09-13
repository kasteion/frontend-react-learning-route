# Fundamentos

## Arquitectura de nuestro proyecto

Platzi Plantpedia:

- Setup y configuración en el curso Next.js: Sitios Estáticos
- Contentful
- GraphQL

## Authenticación clásica vs. moderna: OAuth y JWT

Autenticación != Autorización

Por lo general son conceptos que se confunden y utilizamos de forma intercambiable pero son diferentes.

**¿Cómo saber si quien visita tu app está loggeado o no?** HTTP no tiene estado, al no tener estado nosotros debemos agregar las capas adicionales para saber esta información, debemos rastrear de alguna forma a nuestros usuarios, guardar algo en alguna parte para saber si la visita que tenemos es un usuario o es un visitante. Esto se conoce como sesión.

**Autenticación clásica**

Lo que utilizan la mayoría de backends y la mayoría de frameworks viene con una forma de atenticar que funciona así:

- Se crea un objeto en el servidor (sesión) que persiste en todos los request del cliente.
- También una cookie HTTP only que apunta a esa sesión. La cookie tiene el id de la sesión.

1. El cliente en el browser provee sus credenciales al server
2. El server valida las credenciales
3. Crea una sesión con un timeout configurado
4. Set cookie(HTTP Only, containing session ID)
5. Redirige el usuario a el area autenticada.

- Si el usuario está inactivo, la sesión se puede eliminar en el servidor.
- Si la sesión aún existe, y hay peticiones del cliente, la sesión se puede ir renovando para que el usuario siga teniendo acceso.

Esto se conoce como un patrón stateful, estamos guardando un estado en el servidor. Nuestro servidor sabe que es lo que pasa y por cada usuario que haga login el servidor tiene un objeto que se guarda. Nuestro servidor recuerda todos los usuarios que inician sesión.

**Autenticación moderna - Autenticación por tokens**

- Se crea un token, que es firmado por el servidor y enviado al cliente.
- El cliente puede leer algunas partes del token, pero no puede crear nuevos.
- El cliente envía el token en cada petición. El servidor verifica el token para otorgar acceso.

1. El cliente en el browser provee sus credenciales al server.
2. El server valida las credenciales
3. El server crea un JWT para el usuario
4. El frontend puede enviar request y servir contenido en la SPA.

Esto se conoce como stateless, porque el servidor no conoce cuantos tokens hay afuera. Cuando el servidor entrega el token pierde el track de cuantos tokens hay. El mecanismo de protección es verficiar que el token sea firmado correctamente y que corresponda con la información que el servidor creo al servicio.

Los beneficios del stateless auth son:

- Más fácil de escalar. Sin preocuparnos por espacio en memoria.
- Mayor versatilidad y flexibilidad para trabajar con varios servidores y microservicios.

Gracias a la fexibilidad que nos dan los tokens existen cosas como OAuth. Para delegar a otra aplicación para hacer autenticación. OAuth sería un estándar abierto en que delegamos el acceso a otras aplicaciones.

- OAuth 2.0
- Cookies y HTTP
- JWT
- JWS, JWE

## Patrones de autenticación en Next.js

Nos referimos a la forma en que un usuario puede acceder a un sitio y la arquitectura que esta detras para permitirlo. Hay dos formas de hacerlo...

1. Validar en el cliente
2. Validar desde el servidor

Esto impacta la forma en que podemos almacenar la sesión de nuestro usuario. Una forma muy fácil de saber si el sitio usa una u otra.

Si se valida desde el cliente siempre cargamos el sitio como si no estuvieramos autenticados y la información cambia derrepente al sitio autenticado. Esto se conoce como Flash of Unauthenticadted Content.

Una forma de evitar esto esl utilizando ssr para enviar todo precargado desde el servidor.

**Data-fetching en NextJS**

1. Páginas estáticas. SSG, ISG. No hay un servidor necesariamente y el método de autenticación debe ser diferente.
2. Páginas que usan el servidor. SSR.

Lo mejor en producción siempre será utilizar un servicio especializado en autenticación

**Proveedores**

1. Funcionan mejor desde el cliente: Firebase, Magic o Auth0
2. Funcionan mejor desde el servidor: Cualquier DB con iron/iron-session, Auth0

En el curso de utilizará un framework llamado NextAuth.js (Authentication for Next.js)

**NextAuth.js**

1. Open source y construido para Next.js
2. Moderno.
3. Buenas prácticas de seguridad
4. Muy flexible.

# Configuración

https://github.com/jonalvarezz/platzi-plantpedia

## Configurando Next Auth y proveedores

Crea un nuevo branch llamado dev a partir de la etiqueta 12-auth

> git checkout -b dev 12-auth

> npm install --save next-auth

en .env.local.example y en .env.local crear una variable

NEXTAUTH_URL=http://localhost:3000

Que sería la url de desarrollo.

En el \_app.tsx

```ts
import { Provider as AuthProvider } from "next-auth/client";

// Y se envuelve toda la aplicación en el provider
const NextApp = ({ Component, pageProps }: AppProps) => {
  useServerStyles();
  return (
    // Y se envuelve toda la aplicación en el provider
    <AuthProvider session={pageProps.session}>//...</AuthProvider>
  );
};
```

Y luego se crea un nuevo archivo dentro de pages/api/auth llamado `[...nextauth].ts` para que capture todo lo que llegue a /api/auth/\*

```ts
// 1. Importar next-aut
import NextAuth from "next-auth";
// 2. Importar tipos de typescript de next auth
import type { NextAuthOptions } from "next-auth";
// 3. Improtar Providers que se van a usar despues
import Providers from "next-auth/providers";

// Next-auth tiene varias opciones de configuración el theme es el color de las páginas que nos dará next-auth por defecto, el debug es por el desarrollo.
// Un proveedor es la forma en que queremos que next auth se conecte a otro servicio para delegar al autenticación.
const options: NextAuthOptions = {
  theme: "light",
  debug: true,
  session: {},
  jwt: {},
  providers: [],
};
```

Next-auth tiene varios providers para autenticarnos a diferentes sitios. Y puede ser a apple, google, auth0, etc. Entonces podemos:

```ts
const options: NextAuthOptions = {
  theme: "light",
  debug: true,
  session: {},
  jwt: {},
  providers: [
    Providers.Credentials({
      // Esto el botón dirá sign in with Platzi
      name: "Platzi",
      credentials: {
        // inputs html5
        password: {
          type: "password",
          label: "Nunca pares de...",
        },
      },
      async authorize(credentials) {
        console.log(credentials);
        // El api estaría dentro de https://${process.env.NEXTAUTH_URL}/api/auth/platzi
        // Conectar API
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/platzi`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-type": "application/json" },
        });
        // Transformar response del api a JSON
        const user = await res.json();
        // return user ó return null
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(options);
```

La ruta para iniciar sesión sería:

http://localhost:3000/api/auth/signin

Entonces deberíamos crear una la ruta /api/auth/platzi

Creamos el archivo en platzi.ts en /api/auth

```ts
import type { NextApiHandler } from "next";

const credentialsAuth: NextApiHandler = (request, response) => {
    // GET OR ANY - NOT OK
    if (request.method !== 'POST') {
        response.status(405).end()
        return
    }
    // POST - OK
    // Validar credenciales
    //if (request.body.password === 'aprender') {
    if (request.body.password === process.env.AUTH_PLATZI_SECRET)
        const platziUser: User = {
            name: 'Platzi student',
            email: 'student@platzi.com',
            image: '',
        }
        return response.status(200).json(platziUser)
    }
    // No Authorizado
    response.status(401).end()
}

export default credentialsAuth
```

En resources.d.ts esta definido el tipo User

```ts
type User = {
  name: string;
  email: string;
  image: string;
};
```

## Inicio y cierre de sesión

En TopArea.tsx agrega botones de inicio de sesión y de cierre de sesión.

```ts
import { signIn, signOut, useSession } from "next-auth/client";

function LoginLogout() {
  const [session] = useSession();
  const { t } = useTranslation(["common"]);

  if (!session) {
    return <Button onClick={() => signIn()}>{t("SignIn")}</Button>;
  }

  return (
    <>
      <span>{session.user?.name}</span>
      <Button onClick={() => signOut()}>{t("SignOut")}</Button>
    </>
  );
}
```

Pero existe el flash of authenticated content. Para ayudarnos a evitar esto podemos hacer recibir loading de useSession()

```ts
import { signIn, signOut, useSession } from "next-auth/client";

function LoginLogout() {
  // Agregamos aquí el loading
  const [session, loading] = useSession();
  const { t } = useTranslation(["common"]);

  // Y aquí si esta loading devuelve un null para que muestre content si esta en loading
  if (loading) {
    return null;
  }

  if (!session) {
    return <Button onClick={() => signIn()}>{t("SignIn")}</Button>;
  }

  return (
    <>
      <span>{session.user?.name}</span>
      <Button onClick={() => signOut()}>{t("SignOut")}</Button>
    </>
  );
}
```

## Autenticando desde GitHub

OAuth nos brinda la posibilidad de conectarnos con multiples sitios. NextAuth nos da la posibilidad de conectarnos con muchos sitios en los que los flujos de autenticación ya están resueltos.

Vamos a https://github.com/settings/apps

Y lo que queremos es crear una nueva OAuth App y hay que llenar:

- Application name (Cualquiera)
- Homepage URL (Esta si tiene que ser la url de nuestro dominio http://localhost:3000)
- Application description (Cualquiera)
- Authorization callback url (Es una ruta absoluta de nuestro dominio en este caso http://localhost:3000/api/auth/github)

Esta app configuración nos da dos valores que nos interesan:

- Client ID
- Client Secret

Ahora para configurar un nuevo proveedor esto se hace desde el archivo ``[...nextauth].ts`

```ts
const options: NextAuthOptions = {
  theme: "light",
  debug: true,
  session: {},
  jwt: {},
  providers: [
    Providers.Credentials({
      name: "Platzi",
      credentials: {
        password: {
          type: "password",
          label: "Nunca pares de...",
        },
      },
      async authorize(credentials) {
        console.log(credentials);
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/platzi`, {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-type": "application/json" },
        });
        const user = await res.json();
        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
    // 1. Aquí agrego otro proveedor
    Providers.GitHub({
      // 2. Estos tienen que ser variables de entorno y deben estar en el .env
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecre: process.env.AUTH_GITHUB_SECRET,
    }),
  ],
};

export default NextAuth(options);
```

# Autenticación

## UnderTheHood: Sesiones y JWT

Exploremos que está sucediendo y como se están resolviendo la sesiones con NextAuth y como se están utilizando JWT.

Si abrimos las DevTools, si nos vamos a la pestaña de Application y a la sección de Cookies allí podemos ver las cookies creadas, deben ser cookies de next-auth.

- next-auth-session-token: Es una cookie HttpOnly (No podemos accederla desde el navegador, solo la puede acceder el server)
- next-auth.csrf-token: Es una cookie para evitar cross site request forgery. También es HttpOnly.
- next-auth.callback-url es la única cookie que puedo acceder desde el cliente.

NextAuth hace por debajo un request a la ruta http://localhost:3000/api/auth/session para saber si el usuario esta logeado. Y esto trae los valores del usuario a los que podemos acceder.

**Sesiones y cookies**

- El servidor: tiene acceso a nuestros recursos y puede acceder a la sesión directamente.
- El cliente: debe consultar con el servidor haciendo una petición http (/api/auth/session/).

**La cookie**

- La cookie se marca como SameSite y HttpOnly.
- El cliente no podrá leer esta cookie.

**La sesión y JWT**

- Si no existe una base de datos se utiliza JWT y se almacena en una cookie (Por seguridad se almacena en la cookie).
- Identifica un usuario. Ejemplo: sub, useruuid o uuid.
- Especifica una fecha en la que vencerá la sesión. Es responsabilidad del servidor con next auth de validad esa sesión y marcarla como activa o inactiva cada vez que llegue un request especificando el token.

Con los JWT, el header y payload lo utilizamos desde el cliente para verificar permisos y eso. El sign es un secreto que sirve para verificar que el token es válido.

**Más sobre cookies y JWT**

- La cookie se marcará como Secure solo si la URL del sitio es de conexión segura https.
- El token es firmado por defecto (JWS) pero no encriptado (JWE)

**Cookies**

https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

**JWT**

https://jwt.io/

¿Necesito encriptar el token?
¿Es seguro guardar el token en el cliente?

## Protegiendo páginas desde el cliente y desde el servidor

Uno de los casos más comúnes por los que añadimos autenticación a nuestras páginas es porque queremos que ciertas páginas esten protegidas.

Creamos una nueva página "premium" dentor de la navegación

```ts
import { layout } from "@componentes/layout";
// 3. Importamos el hook de useSession
import { useSession } from "next-auth/client";

function PremiumPage() {
  const [session, loading] = useSession();

  if (loading) {
    return null;
  }

  if (!session) {
    // 2. Si no está loegado
    return <Layout>Acceso Denegado</Layout>;
  }
  // 1. Si el usuario está logeado
  return <Layout>Contenido secretísimo</Layout>;
}

export default PremiumPage;
```

Podemos también utilizar NextAuth desde el lado del servidor para hacer SSR y enviar el contenido precargado. Para esto:

```ts
import { layout } from "@componentes/layout";
// 2. Utilizamos getSession (Es una promesa que se puede usar tanto en el backend como en el frontend para obtener la sesión) useSession utiliza getSession para obtener la sesión.
import { useSession, getSession } from "next-auth/client";

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  // 1. Validar sesión si existe pasa normal y si no debe ir al inicio de sesión.
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

function PremiumPage() {
  const [session, loading] = useSession();

  if (loading) {
    return null;
  }

  if (!session) {
    return <Layout>Acceso Denegado</Layout>;
  }

  return <Layout>Contenido secretísimo</Layout>;
}

export default PremiumPage;
```

**Utilidades**

- useSession: Con react en el cliente
- getSession: Desde el server o desde el cliente con js.

## Protegiendo rutas API

De la misma forma en que protegemos nuestra página también es importante que protejamos nuestras api cuando sea necesaria.

Creamos un api/premium.ts

```tsx
import { NextApiHandler } from "next";
import random from "lodash/random";

const premium: NextApiHandler = async (request, response) => {
  response.status(200).json({
    data: `https://randomfox.ca/images/${random(1, 122)}.jpg`,
    time: new Date().getTime(),
  });
};

export default premium;
```

Esta API no está conectada a la autenticación y debería estarlo...

```tsx
import { NextApiHandler } from "next";
import random from "lodash/random";
import { getSession } from "next-auth/client";

const premium: NextApiHandler = async (request, response) => {
  const session = await getSession({ req: request });

  if (session === null) {
    response.status(401).end();
    return;
  }

  response.status(200).json({
    data: `https://randomfox.ca/images/${random(1, 122)}.jpg`,
    time: new Date().getTime(),
  });
};

export default premium;
```

Si tento la página abierta en dos pestañas y cierro sesión en uno me cierra sesión en todas las pestañas.

Esto es para separar los imports de next-auth por si cambia el api.

auth/client.tsx

```ts
export {
  Provider as SessionProvider,
  useSession,
  getSession,
  getCsrfToken,
  signIn,
  signOut,
} from "next-auth/client";
```

```tsx
import { SessionProvider } from "@auth/client";
```

# Otras consideraciones

## Soluciones basadas en Node.js: Passport, Auth0, emails y bases de datos

NextAuth nos permite conectar con otros servicios. Tenemos proveedores para conectar con GitHub, Twitter, Facebook pero también nos soporta conexión por un provider de Email.

```ts
providers: [
  Providers.Email({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  }),
];
```

**Bases de datos (Adapters)**

- Prisma
- Fauna DB
- Dynamo DB
- Firebase

**¿Qué sucede con PassportJS y otras soluciones de autenticación para Node.js?**

NextJS es una aplicación de NodeJS y podemos configurarlo para que utilice otros middleware. Y configurarlos para que funcionen con otros servicios.

## Seguridad y otras consideraciones con Next.js

Con NextJS y NextAuth tenemos gran flexibilidad para acceder al sitio, salir del sitio, etc.

NexAuth viene con servicios incluidos para hacer OAuth y logearnos de diferentes formas.
