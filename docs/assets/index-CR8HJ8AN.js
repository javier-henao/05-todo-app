(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&i(u)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function i(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}})();const s=[];for(let e=0;e<256;++e)s.push((e+256).toString(16).slice(1));function v(e,t=0){return(s[e[t+0]]+s[e[t+1]]+s[e[t+2]]+s[e[t+3]]+"-"+s[e[t+4]]+s[e[t+5]]+"-"+s[e[t+6]]+s[e[t+7]]+"-"+s[e[t+8]]+s[e[t+9]]+"-"+s[e[t+10]]+s[e[t+11]]+s[e[t+12]]+s[e[t+13]]+s[e[t+14]]+s[e[t+15]]).toLowerCase()}let b;const L=new Uint8Array(16);function C(){if(!b){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");b=crypto.getRandomValues.bind(crypto)}return b(L)}const S=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),w={randomUUID:S};function E(e,t,a){var o;if(w.randomUUID&&!e)return w.randomUUID();e=e||{};const i=e.random??((o=e.rng)==null?void 0:o.call(e))??C();if(i.length<16)throw new Error("Random bytes length must be >= 16");return i[6]=i[6]&15|64,i[8]=i[8]&63|128,v(i)}class A{constructor(t){this.id=E(),this.description=t,this.done=!1,this.createdAt=new Date}}const c={All:"all",Completed:"Completed",Pending:"Pending"},l={todos:[],filter:c.All},P=()=>{T(),console.log("InitStore 🥑")},T=()=>{if(!localStorage.getItem("state"))return;const{todos:e=[],filter:t=c.All}=JSON.parse(localStorage.getItem("state"));l.todos=e,l.filter=t},g=()=>{localStorage.setItem("state",JSON.stringify(l))},F=(e=c.All)=>{switch(e){case c.All:return[...l.todos];case c.Completed:return l.todos.filter(t=>t.done);case c.Pending:return l.todos.filter(t=>!t.done);default:throw new Error(`Option ${e} is not valid.`)}},I=e=>{if(!e)throw new Error("Description is required");l.todos.push(new A(e)),g()},k=e=>{l.todos=l.todos.map(t=>(t.id===e&&(t.done=!t.done),t)),g()},U=e=>{l.todos=l.todos.filter(t=>t.id!==e),g()},x=()=>{l.todos=l.todos.filter(e=>!e.done),g()},D=(e=c.All)=>{l.filter=e,g()},O=()=>l.filter,d={addTodo:I,deleteCompleted:x,deleteTodo:U,getCurrentFilter:O,getTodos:F,initStore:P,loadStore:T,setFilter:D,toggleTodo:k},q=`<section class="todoapp">
  <header class="header">
    <h1>Tareas</h1>
    <input id="new-todo-input" class="new-todo" placeholder="Escribe la tarea y presiona Enter" autofocus>
  </header>

  <!-- This section should be hidden by default and shown when there are todos -->
  <section class="main">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <!-- These are here just to show the structure of the list items -->
      <!-- List items should get the class "editing" when editing and "completed" when marked as completed -->
      <!-- <li class="completed" data-id="abc">
        <div class="view">
          <input class="toggle" type="checkbox" checked>
          <label>Probar JavaScript</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
      </li> -->
      <!-- <li>
                <div class="view">
                    <input class="toggle" type="checkbox">
                    <label>Comprar un unicornio</label>
                    <button class="destroy"></button>
                </div>
                <input class="edit" value="Rule the web">
            </li> -->
    </ul>
  </section>

  <!-- This footer should hidden by default and shown when there are todos -->
  <footer class="footer">
    <!-- This should be "0 items left" by default -->
    <span class="todo-count"><strong id="pending-count">0</strong> pendiente(s)</span>
    <!-- Remove this if you don't implement routing -->
    <ul class="filters">
      <li>
        <a class="selected filtro" class="selected" href="#/">Todos</a>
      </li>
      <li>
        <a class="filtro" href="#/active">Pendientes</a>
      </li>
      <li>
        <a class="filtro" href="#/completed">Completados</a>
      </li>
    </ul>
    <!-- Hidden if no completed items are left ↓ -->
    <button class="clear-completed">Borrar completados</button>
  </footer>
</section>


<footer class="info">
  <p>Template creado por <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
  <!-- Change this out with your name and url ↓ -->
  <p>Codificado por <a href="https://github.com/javier-henao">Javier Henao</a></p>

</footer>`,M=e=>{if(!e)throw new Error("A TODO object is required");const{done:t,description:a,id:i}=e,o=` 
        <div class="view">
          <input class="toggle" type="checkbox" ${t?"checked":""}>
          <label>${a}</label>
          <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
      `,n=document.createElement("li");return n.innerHTML=o,n.setAttribute("data-id",i),e.done&&n.classList.add("completed"),n};let y;const H=e=>{if(y||(y=document.querySelector(e)),!y)throw new Error(`Element ${e} not found`);y.innerHTML=d.getTodos(c.Pending).length};let h;const N=(e,t=[])=>{if(h||(h=document.querySelector(e)),!h)throw new Error(`Element ${e} not found`);h.innerHTML="",t.forEach(a=>{h.append(M(a))})},m={ClearCompletedButton:".clear-completed",TodoList:".todo-list",NewTodoInput:"#new-todo-input",TodoFilters:".filtro",PendingCountLabel:"#pending-count"},R=e=>{const t=()=>{const r=d.getTodos(d.getCurrentFilter());N(m.TodoList,r),a()},a=()=>{H(m.PendingCountLabel)};(()=>{const r=document.createElement("div");r.innerHTML=q,document.querySelector(e).append(r),t()})();const i=document.querySelector(m.NewTodoInput),o=document.querySelector(m.TodoList),n=document.querySelector(m.ClearCompletedButton),u=document.querySelectorAll(m.TodoFilters);i.addEventListener("keyup",r=>{r.keyCode===13&&r.target.value.trim().length!==0&&(d.addTodo(r.target.value),t(),r.target.value="")}),o.addEventListener("click",r=>{const p=r.target.closest("[data-id]");d.toggleTodo(p.getAttribute("data-id")),t()}),o.addEventListener("click",r=>{const p=r.target.className==="destroy",f=r.target.closest("[data-id]");!f||!p||(d.deleteTodo(f.getAttribute("data-id")),t())}),n.addEventListener("click",()=>{d.deleteCompleted(),t()}),u.forEach(r=>{r.addEventListener("click",p=>{switch(u.forEach(f=>f.classList.remove("selected")),p.target.classList.add("selected"),p.target.text){case"Todos":d.setFilter(Filters.All);break;case"Pendientes":d.setFilter(Filters.Pending);break;case"Completados":d.setFilter(Filters.Completed);break}t()})})};d.initStore();R("#app");
