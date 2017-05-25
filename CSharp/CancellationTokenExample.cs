using System;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AsyncAndPromises
{
    public class CancellationTokenExample
    {
        static readonly Random Random = new Random();
        static readonly CancellationTokenSource cancelationSource = new CancellationTokenSource();

        public static void Run()
        {
            Console.WriteLine("Cancelation Token example.");
            var stringBuilder = new StringBuilder();

            var h = new Task(() => AddSymbol(stringBuilder, 'H'), cancelationSource.Token);
            var e = new Task(() => AddSymbol(stringBuilder, 'e'), cancelationSource.Token);
            var l = new Task(() => AddSymbol(stringBuilder, 'l'), cancelationSource.Token);
            var o = new Task(() => AddSymbol(stringBuilder, 'o'), cancelationSource.Token);

            Console.WriteLine("Press enter to stop execution");

            h.Start();
            var promise = h.Then(e)
                           .Then(l)
                           .Then(new Task(() => AddSymbol(stringBuilder, 'l')))
                           .Then(o);


            Console.ReadLine();
            //Throw cancel request
            cancelationSource.Cancel();

            try
            {
                //wait when all threads will be stopped
                promise.Wait(cancelationSource.Token);
            }
            catch (OperationCanceledException ex)
            {
                //it's expected exception
            }
            finally
            {
                Console.WriteLine("Result: {0}", stringBuilder);
                Console.ReadLine();
            }
        }

        public static void AddSymbol(StringBuilder stringBuilder,
                                     char symbol)
        {
            //1-3 second
            Thread.Sleep(Random.Next(1000, 3000));

            //Check if cancellation was requested
            cancelationSource.Token.ThrowIfCancellationRequested();
            stringBuilder.Append(symbol);
            Console.WriteLine("Appended '{0}' symbol", symbol);
        }
    }
}
