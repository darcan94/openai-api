export default function Sidebar({className, children}:{className?: string, children?: any}){
    return(
        <aside 
            className={` flex flex-col justify-start gap-10 w-1/4 px-4 bg-white/70  backdrop-blur-lg  blur-9.8 border border-opacity-45 ${className}`}>
                {children}
        </aside>
    );
}

function getMessages(){
    return [
        {
            "id": "2023-09-09T15:55:05.226Z",
            "role": "system",
            "content": "You are a helpful assistant. Answer as concisely as possible."
        },
        {
            "content": "Explicame brevemente que es react.js",
            "role": "user",
            "createdAt": "2023-09-09T15:55:17.558Z",
            "id": "zdjiMJW"
        },
        {
            "id": "MqVvbg5",
            "createdAt": "2023-09-09T15:55:19.655Z",
            "content": "React.js es una biblioteca de JavaScript utilizada para construir interfaces de usuario interactivas y reutilizables. Se enfoca en la creación de componentes reutilizables que se actualizan de manera eficiente cuando cambian los datos, lo que permite crear aplicaciones web rápidas y escalables.",
            "role": "assistant"
        },
        {
            "content": "dame un ejemplo de un componente en react.",
            "role": "user",
            "createdAt": "2023-09-09T15:55:33.329Z",
            "id": "9iuqINf"
        },
        {
            "id": "VV6fKiB",
            "createdAt": "2023-09-09T15:55:34.383Z",
            "content": "Aquí tienes un ejemplo básico de un componente en React:\n\n```jsx\nimport React from 'react';\n\nclass MiComponente extends React.Component {\n  render() {\n    return (\n      <div>\n        <h1>Hola, soy un componente de React</h1>\n        <p>¡Este es un ejemplo de un componente en React!</p>\n      </div>\n    );\n  }\n}\n\nexport default MiComponente;\n```\n\nEn este ejemplo, `MiComponente` es un componente de React que renderiza un título y un párrafo en un elemento `div`. Puedes utilizar este componente en otros lugares de tu aplicación para reutilizarlo.",
            "role": "assistant"
        }
    ]
}