<h2>C# Examples</h2>

## Parallel execution

```csharp
  var h = Task.Factory.StartNew(() => AddSymbol(stringBuilder, 'H'));
  var e = Task.Factory.StartNew(() => AddSymbol(stringBuilder, 'e'));
  var l = Task.Factory.StartNew(() => AddSymbol(stringBuilder, 'l'));
  var o = Task.Factory.StartNew(() => AddSymbol(stringBuilder, 'o'));

  //Action will be executed parallely
  //Wait for all
  Task.WaitAll(h, e, l, o);
```
Result:
![image](https://cloud.githubusercontent.com/assets/12159879/25973800/53eb500c-36ae-11e7-9ef3-43cb3c2b3331.png)

## Sequential execution 

```csharp
Action h = () => { AddSymbol(stringBuilder, 'H'); };
Action e = () => { AddSymbol(stringBuilder, 'e'); };
Action l = () => { AddSymbol(stringBuilder, 'l'); };
Action o = () => { AddSymbol(stringBuilder, 'o'); };

var promise = h.Then(e);
promise = promise.Then(l)
                 .Then(l)
                 .Then(o);
                  
```
Result:
![image](https://cloud.githubusercontent.com/assets/12159879/25973791/48de1438-36ae-11e7-85c1-ffc096d1eb4c.png)

## Cancellation Token

```csharp
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
```
Result:
![image](https://cloud.githubusercontent.com/assets/12159879/25973809/63b8e9cc-36ae-11e7-830b-01d985cfb4d6.png)
