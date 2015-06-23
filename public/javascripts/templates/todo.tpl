<td><input type=checkbox <%= status == "complete" ? "checked=checked" : "" %>/></td>
<td class="<%= status %>"><%= description %></td>
<td><a href="/#todos/<%= id %>">?</a></td>
<td><span class="glyphicon glyphicon-search" aria-hidden="true" data-delete="<%= id %>"></span></td>