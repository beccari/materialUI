var Header = React.createClass({
    render: function () {
        return (
            <div className='jumbotron text-center'>
                <h1> I'm a Todo-aholic
                    <span className='label label-info'> {this.props.todos.length} </span>
                </h1>
            </div>
        )
    }
});

var TodoItem = React.createClass({
    render: function () {
        return (
            <div className='checkbox'>
                <label>
                    <input type='checkbox'/> {this.props.todo.text} </label>
            </div>
        )
    }
});

var TodoList = React.createClass({
    render: function () {
        var items = this.props.todos.map(function (todo) {
            return (
                <TodoItem todo={todo}/>
            )
        });

        return (
            <div className='row'>
                <div className='col-sm-4 col-sm-offset-4'>
                {items}
                </div>
            </div>
        )
    }
});

var TodoForm = React.createClass({
    render: function () {
        return (
            <div/>
        )
    }
});

var TodosBox = React.createClass({
    getInitialState: function () {
        return {todos: []};
    },
    componentDidMount: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({todos: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div className='container'>
                <Header todos={this.state.todos} />
                <TodoList todos={this.state.todos} />
            </div>
        )
    }
});

React.render(
    <TodosBox url='/todo/api/todos'/>,
    document.getElementById('main')
)