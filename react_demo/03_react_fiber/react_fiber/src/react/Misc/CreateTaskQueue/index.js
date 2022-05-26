/**
 * 导入一个生成任务队列的方法
 */

export const createTaskQueue = () => {
    const queue = [];
    return {
        push: (task) => queue.push(task),
        pop: () => queue.shift(),
        isEmpty: () => queue.length === 0,
    };
};
