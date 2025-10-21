# Plataforma de contratação de serviços - Contrata já

## NextJs 

1- npm install
</br>
2- npm run dev
</br>

Com base nos creterios de avaliação, a aplicação foi implementa as seguintes funcionalidades:
</br>

   ## Autenticação de Usuário
   </br>
    Permite o login e registro de usuários.
   
   ## Gerenciamento de Sessão
   </br>
    Armazenando dados do usuário (token, role) no sessionStorage e os gerencia através do useAuthStore.  

   ## Redirecionamento Baseado em Papel
   </br>
    Após o login/registro, redireciona o usuário para diferentes rotas (/servicos para      
     CLIENT, /historico para PROVIDER) com base em seu papel.
   
   ## Comunicação com API
   </br>
    Utilizei Axios para fazer requisições HTTP ao backend, incluindo um interceptor para anexar o token de
     autenticação.
     
   
   ## Validação de Formulário Frontend
   </br>
      Empregei react-hook-form e zodResolver para validar os dados de entrada nos formulários de
     login, registro, criacão e atualização de serviço.

    ## Gerenciamento de Estado
    </br>
     Estado Global: zustand é utilizado para o gerenciamento de estado global, especificamente para o estado de autenticação (useAuthStore.ts). Ele armazena informações do usuário (userId, name, role, token) e oferece ações para setUser e logout. A persistência do estado de autenticação no sessionStorage via persist middleware, para manter a sessão do usuário.

