/**
 * 模拟ajax请求的接口, 生成并返回模拟数据
 */
import axios from 'axios';
import Mock from 'mockjs';
import MockAdapter from 'axios-mock-adapter';
import { Todos } from './data/todoList';

export default {
    /**
     * mock start
     */
    // 初始化函数
    start() {
        let mock = new MockAdapter( axios );
        // 获取_todo列表, 其中config指前台传过来的值
        mock.onGet( '/todo/list' ).reply(config => {
            // 重组Todos数组，变成我们想要的数据
            let mockTodo = Todos.map( todo => {
                return {
                    id: todo.id,
                    title: todo.title,
                    count: todo.record.filter( ( data ) => {
                        // 过滤record中checked为false的数据,即未完成数量
                        return data.checked === false;
                    } ).length,
                    locked: todo.locked,
                    isDelete: todo.isDelete
                };
            } ).filter(todo => {
                // 过滤掉isDelete为true，因为已经被删除了。
                return todo.isDelete !== true;
            } );
            return new Promise(( resolve, reject ) => {
                // 返回状态为200,并且返回todos数据
                setTimeout(() => {
                    resolve([ 200, {
                        todos: mockTodo
                    } ] );
                }, 200);
            } );
        } );

        // 新增一条_todo
        mock.onPost( '/todo/addTodo' ).reply(config => {
            Todos.push( {
                id: Mock.Random.guid(),
                title: 'newList',
                isDelete: false,
                locked: false,
                record: []
            });
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve( [ 200 ] );
                }, 200 );
            } );
        } );

        // 获取_todo单个列表
        mock.onGet( '/todo/listId' ).reply( config  => {
            let {
                id // id 是传进来的值
            } = config.params;

            // _todo 是根据id和现有的Todos数据匹配，找出id相等的数据，在进行返回
            let todo = Todos.find( todo => {
                return id && todo.id === id;
            } );
            // _todo.count(等待完成数目)等于 _todo.record（代办事项列表下面未被选择的数据)
            todo ? todo.count = todo ? todo.record.filter( ( data ) => {
                return data.checked === false;
            } ).length : null : false;
            return new Promise(( resolve, reject ) => {
                setTimeout( () => {
                    resolve([ 200, {
                        todo: todo
                    } ] );
                }, 200 );
            });
        });

        // 新增一条代办事项
        mock.onPost( '/todo/addRecord' ).reply( config  => {
            let {
                id,// id 是传进来的值唯一待办项的id
                text // text 用户新增输入的数据
            } = JSON.parse( config.data );
            Todos.some( ( t, index ) => {
                if ( t.id === id ) {
                    t.record.push( {
                        text: text,
                        isDelete: false,
                        checked: false
                    } );
                    return true;
                }
            });
            return new Promise(( resolve, reject ) => {
                setTimeout( () => {
                    resolve([ 200 ] );
                }, 200 );
            } );
        } );

        // 修改标题
        mock.onPost( '/todo/editTodo' ).reply( config  => {
            let {
                todo
            } = JSON.parse(config.data);
            Todos.some( ( t, index ) => {
                if ( t.id === todo.id ) {
                    t.title = todo.title;
                    t.locked = todo.locked;
                    t.isDelete = todo.isDelete;
                    return true;
                }
            });
            return new Promise( ( resolve, reject ) => {
                setTimeout( () => {
                    resolve([ 200 ]);
                }, 200 );
            } );
        } );

        // 修改待办单项
        mock.onPost( '/todo/editRecord' ).reply( config  => {
            let {
                id,
                record,
                index
            } = JSON.parse( config.data );
            Todos.some( ( t ) => {
                if ( t.id === id ) {
                    t.record[index] = record;
                    return true;
                }
            } );
            return new Promise( ( resolve, reject ) => {
                setTimeout( () => {
                    resolve( [ 200 ] );
                }, 200 );
            } );
        } );
    }
};
