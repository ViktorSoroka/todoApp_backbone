<td><input type=checkbox <%= status == "complete" ? "checked=checked" : "" %>/></td>
<td class="<%= status %>"><%= description %></td>
<td><a href="/#todos/<%= id %>">?</a></td>
<td><span class="glyphicon glyphicon glyphicon-edit aria-hidden="true" data-update="<%= id %>"></span></td>
<td><span class="glyphicon glyphicon-remove" aria-hidden="true" data-delete="<%= id %>"></span></td>