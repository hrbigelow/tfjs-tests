import * as tf from '@tensorflow/tfjs';

function gathernd_test(side, margin) {
    let total = side + 2 * margin;

    // indices in a square with ranges [-margin, w+margin] x [-margin,
    // h+margin], in row major order.  flat layout is [x1, y1, x2, y2, ...]
    let indices = [];
    for (let y = -margin; y != side+margin; y+=1) {
        for (let x = -margin; x != side+margin; x+=1) {
            indices.push(y);
            indices.push(x);
        }
    }

    tf.tidy(() => {

        // 1,2,3,...
        let ordinals = [...Array(side * side).keys()].map(e => e+1);
        let indices_ten = tf.tensor(indices).cast('int32');
        let input_ten = tf.tensor(ordinals).cast('int32');

        indices_ten = tf.reshape(indices_ten, [total * total, 2]);
        input_ten = tf.reshape(input_ten, [side, side]);

        let gathered = tf.gatherND(input_ten, indices_ten);
        gathered = tf.reshape(gathered, [total, total]);
        gathered.print();

    });
}


export { gathernd_test as default };



