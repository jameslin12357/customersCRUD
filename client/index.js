var table,layer,id;
layui.use(['table','layer'], function(){
    table = layui.table;
    layer = layui.layer;
    table.render({
        elem: '#test'
        ,url:'http://localhost:3001/customers'
        ,cols: [[
            {field:'customerId', title: 'CustomerID'}
            ,{field:'firstName', title: 'Customer First Name'}
            ,{field:'lastName', title: 'Customer Last Name'}
            ,{field:'major', title: 'Customer Major'}
            ,{field:'bio', title: 'Customer Bio'}
            ,{field:'age', title: 'Customer Age'}
            ,{field:'grade', title: 'Customer Grade'}
            ,{field:'gpa', title: 'Customer GPA'}
            ,{field:'gender', title: 'Customer Gender'}
            ,{field:'created', title: 'Created'}
            ,{field:'updated', title: 'Updated'}
            ,{fixed: 'right', width: 200, title: 'CRUD', align:'center', toolbar: '#barDemo'}        
]]
        ,toolbar: '#barDemo2'
        ,page: true
        ,title: "CustomerCRUD"
    });
//监听工具条 
table.on('tool(test)', function(obj) { //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
    var data = obj.data; //获得当前行数据
    var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
    var tr = obj.tr; //获得当前行 tr 的 DOM 对象（如果有的话）

    if (layEvent === 'detail') { //查看
        layer.open({
            btn: [],
            maxWidth: 750,
            shade: 0,
            title: "Customer",
            content: `<div>
                             <p><span>CustomerID:</span> <span>${data["customerId"]}</span></p>
                             <p><span>Customer First Name:</span> <span>${data["firstName"]}</span></p>
                             <p><span>Customer Last Name:</span> <span>${data["lastName"]}</span></p>
                             <p><span>Customer Major:</span> <span>${data["major"]}</span></p>
                             <p><span>Customer Bio:</span> <span>${data["bio"]}</span></p>
                             <p><span>Customer Age:</span> <span>${data["age"]}</span></p>
                             <p><span>Customer Grade:</span> <span>${data["grade"]}</span></p>
                             <p><span>Customer GPA:</span> <span>${data["gpa"]}</span></p>
                             <p><span>Customer Gender:</span> <span>${data["gender"]}</span></p>
                             <p><span>Created:</span> <span>${data["created"]}</span></p>
                             <p><span>Updated:</span> <span>${data["updated"]}</span></p>                            
</div>`
        });
        //layer.msg(JSON.stringify(data));
        console.log(data);
    } else if (layEvent === 'del') { //删除
        id = data["customerId"];
        layer.open({
            btn: [],
            shade: 0,
            title: "Delete Customer",
            content: `<div><div class="mb-15 tc">Confirm delete customer?</div><div class="tr"><button id="buttonDelete" type="submit" class="layui-btn layui-btn-danger">Delete</button></div></div>`
        });
        document.getElementById("buttonDelete").addEventListener("click", function (e) {
            deleteCustomerPost();
        });
    } else if (layEvent === 'edit') { //编辑
        id = data["customerId"];
        layer.open({
            btn: [],
            shade: 0,
            title: "Update Customer",
            content: `<form class="layui-form layui-form-pane" action="">
                              <div class="layui-form-item">
                    <label class="layui-form-label">First Name</label>
                    <div class="layui-input-inline">
                      <input type="text" name="firstName" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${data["firstName"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">Last Name</label>
                    <div class="layui-input-inline">
                      <input type="text" name="lastName" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${data["lastName"]}">
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">Major</label>
                    <div class="layui-input-inline">
                      <input type="text" name="major" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${data["major"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">Bio</label>
                    <div class="layui-input-inline">
                      <input type="text" name="bio" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input"  required value="${data["bio"]}">
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">Age</label>
                    <div class="layui-input-inline">
                      <input type="text" name="age" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${data["age"]}">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">Grade</label>
                    <div class="layui-input-inline">
                      <input type="text" name="grade" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${data["grade"]}">
                    </div>
                  </div>
  <div class="layui-form-item">
                    <label class="layui-form-label">GPA</label>
                    <div class="layui-input-inline">
                      <input type="text" name="gpa" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${data["gpa"]}">
                    </div>
                  </div>
  <div class="layui-form-item">
                    <label class="layui-form-label">Gender</label>
                    <div class="layui-input-inline">
                      <input type="text" name="gender" lay-verify="required" placeholder="请输入" autocomplete="off" class="layui-input" required value="${data["gender"]}">
                    </div>
                  </div>
 <button type="submit" class="layui-btn layui-btn-normal fr">Save</button>
</form>`
        });
        document.getElementsByTagName("form")[0].addEventListener("submit", function (e) {
            e.preventDefault();
            editCustomerPost();
        });
    } 


});

table.on('toolbar(test)', function(obj){
  var checkStatus = table.checkStatus(obj.config.id);
  switch(obj.event){
    case 'create':
         layer.open({
            btn: [],
            shade: 0,
            title: "Create Customer",
            content: `<form class="layui-form layui-form-pane" action="">
                   <div class="layui-form-item">
                    <label class="layui-form-label">First Name</label>
                    <div class="layui-input-inline">
                      <input type="text" name="firstName" lay-verify="required" placeholder="Enter first name" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">Last Name</label>
                    <div class="layui-input-inline">
                      <input type="text" name="lastName" lay-verify="required" placeholder="Enter last name" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">Major</label>
                    <div class="layui-input-inline">
                      <input type="text" name="major" lay-verify="required" placeholder="Enter major" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">Bio</label>
                    <div class="layui-input-inline">
                      <input type="text" name="bio" lay-verify="required" placeholder="Enter bio" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
                     <div class="layui-form-item">
                    <label class="layui-form-label">Age</label>
                    <div class="layui-input-inline">
                      <input type="text" name="age" lay-verify="required" placeholder="Enter age" autocomplete="off" class="layui-input" required>
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">Grade</label>
                    <div class="layui-input-inline">
                      <input type="text" name="grade" lay-verify="required" placeholder="Enter grade" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
<div class="layui-form-item">
                    <label class="layui-form-label">GPA</label>
                    <div class="layui-input-inline">
                      <input type="text" name="gpa" lay-verify="required" placeholder="Enter GPA" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
<div class="layui-form-item">
                    <label class="layui-form-label">Gender</label>
                    <div class="layui-input-inline">
                      <input type="text" name="gender" lay-verify="required" placeholder="Enter gender" autocomplete="off" class="layui-input"  required>
                    </div>
                  </div>
 <button type="submit" class="layui-btn layui-btn-normal fr">Save</button>
</form>`
        });
        document.getElementsByTagName("form")[0].addEventListener("submit", function (e) {
            e.preventDefault();
            createCustomerPost();
        });
    break;
  }
});
});
function editCustomerPost(){
    var form = document.getElementsByTagName("form")[0];
    var inputs = form.getElementsByTagName("input");
    var firstName = inputs[0].value;
    var lastName = inputs[1].value;
    var major = inputs[2].value;
    var bio = inputs[3].value;
    var age = inputs[4].value;
    var grade = inputs[5].value;
    var gpa = inputs[6].value;
    var gender = inputs[7].value;
    $.ajax({
        type: "post",
        url: `http://localhost:3001/customers/${id}`,
        data: {
            "firstName": firstName, "lastName": lastName, "major": major, "bio": bio, "age": age, "grade": grade, "gpa": gpa, "gender": gender
        },
        dataType: "json",
        success: function (data) {
            if (data.code === 1){
                layer.closeAll();
                layer.msg("Customer updated");
                table.reload('test', {
  //url: '/api/table/search'
  //,where: {} //设定异步数据接口的额外参数
  //,height: 300
});
                //$('#dg').datagrid('reload');
            }
        },
        error: function (item, err) {
        }
    });
}

function deleteCustomerPost() {
    $.ajax({
        type: "get",
        url: `http://localhost:3001/deleteCustomer/${id}`,
        dataType: "json",
        success: function (data) {
            if (data.code === 1) {
                layer.closeAll();
                layer.msg("Customer deleted");
                table.reload('test', { 
  //url: '/api/table/search'
  //,where: {} //设定异步数据接口的额外参数
  //,height: 300
});         
            
}
        },
        error: function (item, err) {
            console.log(err);
        }
    });
}

function createCustomerPost(){
    var form = document.getElementsByTagName("form")[0];
    var inputs = form.getElementsByTagName("input");
    var firstName = inputs[0].value;
    var lastName = inputs[1].value;
    var major = inputs[2].value;
    var bio = inputs[3].value;
    var age = inputs[4].value;
    var grade = inputs[5].value;
    var gpa = inputs[6].value;
    var gender = inputs[7].value;    
    $.ajax({
        type: "post",
        url: `http://localhost:3001/customers`,
        data: {
            "firstName": firstName, "lastName": lastName, "major": major, "bio": bio, "age": age, "grade": grade, "gpa": gpa, "gender": gender
        },
        dataType: "json",
        success: function (data) {
            if (data.code === 1){
                layer.closeAll();
                layer.msg("Customer created");
                //$('#dg').datagrid('reload');
                 table.reload('test', {
  //url: '/api/table/search'
  //,where: {} //设定异步数据接口的额外参数
  //,height: 300
});
            
}
        },
        error: function (item, err) {
        }
    });
}

function searchCustomer(){
    var searchTerm = document.getElementById('inputSearchCustomer').value;
    var searchTermFinal = "";
    if (searchTerm !== ""){
        searchTermFinal = searchTerm;
    }
    /*$("#dg").datagrid({
        url: `http://localhost:8080/searchProduct?term=${searchTermFinal}`,
        method: 'get',
        onLoadSuccess: function (data) {
        }*/
   table.reload('test', {
  	url: `http://localhost:3001/searchCustomer?term=${searchTermFinal}`
  //,where: {} //设定异步数据接口的额外参数
  //,height: 300
});


}
