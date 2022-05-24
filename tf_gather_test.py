import sys
import tensorflow as tf

"""
Test tf.gather_nd in 2D mode, to see how it handles out-of-bounds indices.

generate a set of indices in a square grid with positions from [-margin,
side+margin) along both x and y axis.  
"""

def main(side, margin):
    total=side+margin+margin
    
    indices = [
        i 
        for y in range(-margin, side+margin) 
        for x in range(-margin, side+margin) 
        for i in [y, x]
        ]

    indices = tf.constant(indices, dtype=tf.int32, shape=(total * total, 2))
    
    ordinals = tf.range(1, side*side+1)
    input = tf.reshape(ordinals, shape=(side, side))

    gathered = tf.gather_nd(input, indices)
    gathered = tf.reshape(gathered, (total, total)).numpy()
    print(gathered)

if __name__ == '__main__':
    side = int(sys.argv[1])
    margin = int(sys.argv[2])
    main(side, margin)


