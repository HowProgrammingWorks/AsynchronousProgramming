using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AsyncAndPromises
{
    public class SequentialExecutionExample
    {
        static readonly Random Random = new Random();

        public static void SequentialPromiseExample()
        {
            var stringBuilder = new StringBuilder();

            var h = new Task(() => AddSymbol(stringBuilder, 'H'));
            var e = new Task(() => AddSymbol(stringBuilder, 'e'));
            var l = new Task(() => AddSymbol(stringBuilder, 'l'));
            var o = new Task(() => AddSymbol(stringBuilder, 'o'));

            //Functions will be executed in order as it was specified
            h.Start();
            var promise = h.Then(e)
                           .Then(l)
                           .Then(new Task(() => AddSymbol(stringBuilder, 'l')))
                           .Then(o);

            promise.Wait();

            Console.WriteLine(stringBuilder.ToString());
            Console.ReadLine();
        }

        public static void SequentialPromiseExampleImprovedSyntax()
        {
            var stringBuilder = new StringBuilder();

            Action h = () => { AddSymbol(stringBuilder, 'H'); };
            Action e = () => { AddSymbol(stringBuilder, 'e'); };
            Action l = () => { AddSymbol(stringBuilder, 'l'); };
            Action o = () => { AddSymbol(stringBuilder, 'o'); };

            var promise = h.Then(e);
            promise = promise.Then(l)
                .Then(l)
                .Then(o);

            promise.Wait();

            Console.WriteLine(stringBuilder.ToString());
            Console.ReadLine();
        }

        public static void AddSymbol(StringBuilder stringBuilder,
                                     char symbol)
        {
            //1-3 seconds
            Thread.Sleep(Random.Next(1000, 3000));

            stringBuilder.Append(symbol);
            Console.WriteLine("Appended '{0}' symbol", symbol);
        }
    }
}
