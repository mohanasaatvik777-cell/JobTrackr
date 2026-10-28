# What is the virtual DOM, and what does reconciliation do?
ans:
The virtual DOM is a lightweight of the latest original DOM.
The reconciliation is the process of comparing the new virtual DOM with virtual DOM  to see the changes and reflect them in the original DOM, this process is called as reconciliation

# Why do lists need keys, and what goes wrong with the index as a key? What does JSX compile to?
Ans:
 Lists items need keys because to know to react that which items has done what like whether is has been modifield or deleted for this purpose. If you use index as lists key, if a item with index 0 and another item with index 1 then when index 0 item is deleted then the index 1 item now will be at index 0. So like this the overlap of the keys of the items it going to happen. This is the purpose the keys are not designed with the index. The compiler update keys again with 0 with the already key exists 1 item.

 # Why must state be treated as immutable in React?
 Ans: 
 In react state compares with the same memory so if updates it will done in the same memory, so the react checks there is no change the memory or reference so it has not changing so it is immutable.