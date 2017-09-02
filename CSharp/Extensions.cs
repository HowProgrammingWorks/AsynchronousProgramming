using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AsyncAndPromises
{
    /// <summary>
    /// Just add custom methods to Existing classes.
    /// It makes syntax like JavaScript
    /// </summary>
    public static class Extensions
    {
        public static Task Then(this Task task, Task nextTask)
        {
            task.ContinueWith(t =>
            {
                if (!nextTask.IsCanceled)
                    nextTask.Start();
            });

            return nextTask;
        }

        public static Task Then(this Task task, Action nextAction)
        {
            var nextTask = new Task(nextAction);
            return task.Then(nextTask);
        }

        public static Task Then(this Action action, Action nextAction)
        {
            var rootTask = new Task(action);
            rootTask.Start();
            return rootTask.Then(nextAction);
        }
    }
}
