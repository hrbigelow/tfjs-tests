# Installation

```bash
# Test tf.gather_nd behavior on GPU
# Usage: tf_gather_test.py <side> <margin>
python tf_gather_test.py 5 3
```

This script first generates an `input` tensor of shape `side` x `side`, with
values 1 through `side * side`, in row-major order.  This is useful for
tagging which elements of input are being gathered.

Secondly, it generates an indices tensor that contains all of the indices in
the input, plus some additional out-of-bounds indices.  So, for example, it
generates the cartesian product of indices `[-2, -1, 0, 1, 2, 3, 4, 5]`, for
`side=4`, `margin=2`

Finally, it prints out the results of the gather_nd call.  gather_nd is
supposed to output `0` for any out-of-bounds indices.  In the case of Python
tf, this is true.

For the call with `side=5`, `margin=3`, the output is:

```
[[ 0  0  0  0  0  0  0  0  0  0  0]
 [ 0  0  0  0  0  0  0  0  0  0  0]
 [ 0  0  0  0  0  0  0  0  0  0  0]
 [ 0  0  0  1  2  3  4  5  0  0  0]
 [ 0  0  0  6  7  8  9 10  0  0  0]
 [ 0  0  0 11 12 13 14 15  0  0  0]
 [ 0  0  0 16 17 18 19 20  0  0  0]
 [ 0  0  0 21 22 23 24 25  0  0  0]
 [ 0  0  0  0  0  0  0  0  0  0  0]
 [ 0  0  0  0  0  0  0  0  0  0  0]
 [ 0  0  0  0  0  0  0  0  0  0  0]]
```



```bash
git clone https://github.com/hrbigelow/tfjs-tests.git
cd tfjs-tests
npm update
npm run dev
```

This web app does the same thing as `tf_gather_test.py` but using
Tensorflow.js.  In this case, `tf.gatherND` retrieves values from the input
even for out-of-bounds indices.  They are reported to the console.  The pattern
of retrieval for `side=5`, `margin=3` is:

```
Tensor
    [[1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
     [1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ],
     [1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 , 2 , 3 ],
     [1 , 1 , 1 , 1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 ],
     [3 , 4 , 5 , 6 , 7 , 8 , 9 , 10, 11, 12, 13],
     [8 , 9 , 10, 11, 12, 13, 14, 15, 16, 17, 18],
     [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
     [18, 19, 20, 21, 22, 23, 24, 25, 25, 25, 25],
     [23, 24, 25, 25, 25, 25, 25, 25, 25, 25, 25],
     [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25],
     [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25]]
```




