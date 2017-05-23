using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AsyncAndPromises
{
    public class ParallelExecutionExample
    {
        static readonly Random Random = new Random();

        public static void SequentialPromiseExample()
        {
            var stringBuilder = new StringBuilder();

            var h = Task.Factory.StartNew(() => AddSymbol(stringBuilder, 'H'));
            var e = Task.Factory.StartNew(() => AddSymbol(stringBuilder, 'e'));
            var l = Task.Factory.StartNew(() => AddSymbol(stringBuilder, 'l'));
            var o = Task.Factory.StartNew(() => AddSymbol(stringBuilder, 'o'));

            //Action will be executed parallely
            //Wait for all
            Task.WaitAll(h, e, l, o);

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
