<h3 class="<%= status %>">
    <input type=checkbox <%= status == "complete" ? "checked=checked" : "" %>/> <%= description %>
    <a href="/#todos/<%= id %>">?</a>
    <span glyphicon glyphicon-align-left" aria-hidden="true" data-delete="<%= id %>"></span>
</h3>