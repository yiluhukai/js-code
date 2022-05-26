/**
 *
 * 实现render方法：
 *
 * render方法主要功能：1.向任务队列中添加任务
 *                  2. 浏览器空闲的时候从任务队列中取出任务执行
 *
 * 任务：这里的任务就是通过vdom对象构建fiber对象
 *
 */

import { createTaskQueue, arrified, createStateNode, getTag } from "../Misc";

const taskQueue = createTaskQueue();

let subTask = null;

const getFirstTask = () => {
    /**
     * 获取任务队列队列中第一个任务的子任务
     *
     */

    const subTask = taskQueue.pop();
    // console.error(subTask);

    /**
     * 构建fiber对象(最晚层元素root对应的fiber对象)
     */

    return {
        props: subTask.props,
        stateNode: subTask.dom, //当前fiber对象对应的dom
        tag: "hostRoot", //根节点
        effects: [],
        child: null, //后面构建了子fiber节点再去设置
    };
};

/**
 *
 * @param {*} fiber 父fiber对象
 * @param {Array | Object} children 虚拟dom
 */
const reconcileChildren = (fiber, children) => {
    //当children是根fiber对象时，children是对象，当是用creaeElement方法创建的，则是数组
    // 将children转成数组统一处理
    const arrifiedChildren = arrified(children);
    let index = 0,
        element = null,
        length = arrifiedChildren.length,
        newFiber = null,
        prevFiber = null;

    while (index < length) {
        element = arrifiedChildren[index];
        // 将当前的虚拟dom构建成fiber对象
        newFiber = {
            type: element.type,
            props: element.props,
            tag: getTag(element),
            effects: [],
            effectTag: "placement", // 添加节点
            // stateNode: null,
            parent: fiber,
        };
        // 给新创建的fiber对象添加stateNode属性
        newFiber.stateNode = createStateNode(newFiber);

        if (index == 0) {
            // 作为当前节点的child
            fiber.child = newFiber;
        } else {
            //作为前一个兄弟节点的邻居节点
            prevFiber.subling = newFiber;
        }
        prevFiber = newFiber;
        index++;
    }
};

const executeTask = (fiber) => {
    /**
     * 构建当前fiber对象的子fiber对象
     */
    reconcileChildren(fiber, fiber.props.children);

    // 下次任务时继续构建fiber.child对象,z这块只处理了子节点，没有处理兄弟节点
    if (fiber.child) {
        return fiber.child;
    }

    // 当没有子节点的时候，开始去查找兄弟节点并构建fiber对象
    let currentFiber = fiber;

    while (currentFiber.parent) {
        // 存放当前节点下的所有fiber对象，包含自身
        currentFiber.parent.effects = currentFiber.parent.effects.concat(
            currentFiber.effects.concat([currentFiber])
        );
        if (currentFiber.subling) {
            return currentFiber.subling; // 基于该节点去构建
        }
        currentFiber = currentFiber.parent;
        // 向上去处理父节点subling节点
    }
    console.dir(fiber);
};

const workLoop = (deadline) => {
    if (!subTask) {
        subTask = getFirstTask();
        // console.log(subTask);
    }

    while (subTask && deadline.timeRemaining() > 1) {
        // 执行任务并返回一个新的任务,这里的任务是构建好的fiber对象
        subTask = executeTask(subTask);
    }
};

// 执行任务
const performTask = (deadline) => {
    // 开启任务循环
    workLoop(deadline);
    // 当任务执行中断后中心执行
    if (subTask || !taskQueue.isEmpty()) {
        requestIdleCallback(performTask);
    }
};

/**
 * render方法的参数，第一个element代表虚拟dom，第二个参数代表根元素
 */
export function render(element, dom) {
    // 向任务队列中添加任务，将jsx最为当前元素的子元素
    taskQueue.push({ dom, props: { children: element } });

    // 取出我们刚刚添加的任务

    // console.log(taskQueue);

    // 取出任务队列中的任务执行
    requestIdleCallback(performTask);
}
